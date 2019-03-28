import * as fs from "fs";
import * as path from "path";
import * as express from "express";
import * as serveStatic from "serve-static";
import * as compression from "compression";
import * as morgan from "morgan";
import * as passport from "passport";
import * as session from "express-session"
import * as express_graphql from "express-graphql"
import * as cors from "cors"
import * as dotenv from "dotenv"
import { buildSchema } from "graphql"
import { GroundTruthStrategy } from "./routes/strategies"
import { IUser, User } from "./schema";
import { userRoutes } from "./routes/user";

dotenv.config();

const PORT = 3001;
const STATIC_ROOT = "../client";
const typeDefs = fs.readFileSync(path.resolve(__dirname, "../api.graphql"), "utf8");

export let app = express();
app.use(morgan("dev"));
app.use(compression());
app.use('*', cors());

let session_secret = process.env['SECRET'] || 'default';
app.use(session({
    secret:session_secret,
    saveUninitialized: false,
    resave: true
}));


app.use(passport.initialize());
app.use(passport.session());

export function loggedInErr(req, res, next) {
    if (req.user && req.user.email === req.body.email) {
        res.status(200).json({
            success: true
        });
        next()
    }
    else {
        res.status(401).json({ "error": "User not logged in", success: false });
        return;
    }
}

const gturl = String(process.env.groundTruthurl || "login.hack.gt");
const groundTruthStrategy = new GroundTruthStrategy(gturl);
passport.use(groundTruthStrategy);
passport.serializeUser<IUser, string>((user, done) => {
	done(null, user.uuid);
});
passport.deserializeUser<IUser, string>((id, done) => {
    User.findOne({ uuid: id }, (err, user) => {
		done(err, user!);
	});
});

let getUser = async function (args) {
    let name = args.name
    console.log(args)
    let users;
    if(args.name == "" || args.name == null) {
        users = await User.find({})
    } else {
        users = await User.find(args)
    }
    console.log(users)
    if (!users) {
        return null;
    }
    return users
}

let updateUser = async function(args) {
    let id = args.id
    let updated = User.findByIdAndUpdate(args.id, {"$set": args},{new: true})
    return updated
}
let apiRouter = express.Router();

let root = {
    user: getUser,
    update_user: updateUser

};

apiRouter.use("/user", userRoutes);

app.use("/api", apiRouter);

app.use('/graphql', express_graphql({
    schema: buildSchema(typeDefs),
    rootValue: root,
    graphiql: true
}));

app.route("/").get((request, response) => {
	response.redirect("/api/user/login")
});

app.use("/", serveStatic(path.resolve(__dirname, STATIC_ROOT)));

app.listen(PORT, () => {
});
