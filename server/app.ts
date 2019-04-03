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
const typeDefs = fs.readFileSync(path.resolve(__dirname, "../api.graphql"), "utf8");
const VERSION_NUMBER = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")).version;
const VERSION_HASH = require("git-rev-sync").short();

export const app = express();
app.use(morgan("dev"));
app.use(compression());
app.use(cors());
const session_secret = process.env['SECRET'];
if (!session_secret) {
    throw new Error("Secret not specified");
}
app.use(express.static(path.join(__dirname, 'build')));
app.use(session({
    secret:session_secret,
    saveUninitialized: false,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

export function loggedInErr(req, res, next) {
    if (req.user) {
        res.status(200).json({
            success: true
        });
        next();
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
    let users;
    if(args.name == "" || args.name == null) {
        users = await User.find({});
    } else {
        users = await User.find({name: {$regex: '.*'+args.name+'.*', $options: 'i'}});
    }
    if (!users) {
        return null;
    }
    users.sort(function(a, b){return a.name.toLowerCase().indexOf(args.name.toLowerCase()) - b.name.toLowerCase().indexOf(args.name.toLowerCase())});
    return users;
}

let updateUser = async function(args) {
    return User.findOneAndUpdate({'uuid':args.uuid}, { "$set": args }, { new: true });
}

let getUserProfile = async function (args) {
    console.log(args);
    return User.findOne({uuid: args.uuid});
}

let apiRouter = express.Router();

const root = {
    user: getUser,
    update_user: updateUser,
    user_profile: getUserProfile
};

apiRouter.use("/user", userRoutes);

app.use("/api", apiRouter);

app.use('/graphql', express_graphql({
    schema: buildSchema(typeDefs),
    rootValue: root,
    graphiql: true
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Team Formation system v${VERSION_NUMBER} @ ${VERSION_HASH} started on port ${PORT}`);
});
