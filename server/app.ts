import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as crypto from "crypto";

import * as express from "express";
import * as serveStatic from "serve-static";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as multer from "multer";
import * as morgan from "morgan";
import * as passport from "passport";
import * as session from "express-session"
import * as express_graphql from "express-graphql"
import * as cors from "cors"
import * as dotenv from "dotenv"
import {buildSchema} from "graphql"
import {GroundTruthStrategy} from "./routes/strategies"
import flash = require("connect-flash");
dotenv.config();
const PORT = 3001;
const UNIQUE_APP_ID = process.env.UNIQUE_APP_ID || "team-formation";
const STATIC_ROOT = "../client";

const VERSION_NUMBER = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")).version;
const VERSION_HASH = require("git-rev-sync").short();
const typeDefs = fs.readFileSync(path.resolve(__dirname, "../api.graphql"), "utf8");
export let app = express();
app.use(morgan("dev"));
app.use(compression());
app.use('*', cors());
app.use(flash())
let cookieParserInstance = cookieParser(undefined, {
	"path": "/",
	"maxAge": 1000 * 60 * 60 * 24 * 30 * 6, // 6 months
	"secure": false,
	"httpOnly": true
} as cookieParser.CookieParseOptions);
app.use(cookieParserInstance);
let session_secret = process.env['SECRET'] || 'default';
app.use(session({
    secret:session_secret,
    saveUninitialized: false,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());


 // For future unit testing and dependent routes; see https://github.com/HackGT/Ultimate-Checkin/blob/master/test/api.ts#L11

import {
	IUser, IUserMongoose, User, ITeam, Team
} from "./schema";

// Check for number of admin users and create default admin account if none
// Promise version of crypto.pbkdf2()
export function pbkdf2Async (...params: any[]) {
	return new Promise<Buffer>((resolve, reject) => {
		params.push(function (err: Error, derivedKey: Buffer) {
			if (err) {
				reject(err);
				return;
			}
			resolve(derivedKey);
		});
		crypto.pbkdf2.apply(null, params);
	});
}
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
export let postParser = bodyParser.urlencoded({extended:false
});
export let uploadHandler = multer({
	"storage": multer.diskStorage({
		destination: function (req, file, cb) {
			// The OS's default temporary directory
			// Should be changed (or moved via fs.rename()) if the files are to be persisted
			cb(null!, os.tmpdir());
		},
		filename: function (req, file, cb) {
			cb(null!, `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`);
		}
	}),
	"limits": {
		"fileSize": 50000000, // 50 MB
		"files": 1
	}
});
const gturl = String(process.env.groundTruthurl || "login.hack.gt");

const groundTruthStrategy = new GroundTruthStrategy(gturl);
passport.use(groundTruthStrategy);
// For API endpoints
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
    let users = await User.find(args)
    console.log(users)
    if (!users) {
        return null;
    }
    return users
}

let updateUser = async function(args) {
    let id = args.id
    console.log(args.id)
    let updated = User.findByIdAndUpdate(args.id, {"$set": args},{new: true})
    console.log("ard",updated)
    return updated
}
let apiRouter = express.Router();
// API routes go here
import {userRoutes} from "./routes/user";
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
	response.send("Rendered handlebars template here");
});

app.use("/node_modules", serveStatic(path.resolve(__dirname, "../node_modules")));
app.use("/", serveStatic(path.resolve(__dirname, STATIC_ROOT)));

app.listen(PORT, () => {
	console.log(`Team Formation system v${VERSION_NUMBER} @ ${VERSION_HASH} started on port ${PORT}`);
});
