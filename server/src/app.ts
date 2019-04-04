import fs from "fs";
import path from "path";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import passport from "passport";
import session from "express-session"
import express_graphql from "express-graphql"
import cors from "cors"
import dotenv from "dotenv"
import { buildSchema } from "graphql"
import { GroundTruthStrategy } from "./routes/strategies"
import { IUser, User } from "./schema";
import { userRoutes } from "./routes/user";

dotenv.config();

const PORT = 3000;
const typeDefs = fs.readFileSync(path.resolve(__dirname, "../api.graphql"), "utf8");
const VERSION_NUMBER = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")).version;
//const VERSION_HASH = require("git-rev-sync").short();

export let app = express();

if (process.env.ISPRODUCTION === 'true') {
	app.enable("trust proxy");
}
else {
	console.warn("OAuth callback(s) running in development mode");
}

app.use(morgan("dev"));
app.use(compression());
app.use(cors());
const session_secret = process.env['SECRET'];
if (!session_secret) {
    throw new Error("Secret not specified");
}
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

const gturl = String(process.env.GROUNDTRUTHURL || "login.hack.gt");
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
        users = await User.find({skills: "$elemMatch": {{"$regex": '.*'+args.skill+'.*', $options: 'i'}}});
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

app.use(express.static(path.join(__dirname, "../../client/build")));
app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Team Formation system v${VERSION_NUMBER} started on port ${PORT}`);
});
