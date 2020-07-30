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
import { IUser, User, Team} from "./schema";
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
let getTeams = async function(args) {
	return await Team.find({
		"public": true
	})
}
let getUser = async function (args) {
    let search = args.search ? args.search : null;
    let users;
    let skills;
    let grad_years;
    let schools;
    let skillSearch = [] as {}[];
    let yearSearch = [] as {}[];
    let schoolSearch = [] as {}[];
    
    if (args.skill) {
        skills = args.skill.match(/\w+/g);
        for (let i = 0; i < skills.length; i++) {
            skillSearch.push({ skills: { "$elemMatch": { "$regex": '.*' + skills[i] + '.*', "$options": 'i' } } })
        }
    }
    if (args.grad_year) {
        grad_years = args.grad_year.match(/\w+/g);
        for (let i = 0; i < grad_years.length; i++) {
            yearSearch.push({ grad_year: grad_years[i] });
        }
    }
    if (args.school) {
        console.log(args.school);
        schools = args.school.split(',');
        console.log(schools);
        for (let i = 0; i < schools.length; i++) {
            schoolSearch.push({ school: schools[i] });
        }
        console.log(JSON.stringify(schoolSearch));
    }

    if (search && skills && grad_years && schools) {
        console.log('all filters applied...');
        users = await User.find({
            $and: [
                { $text: { $search: search } },
                { $and: skillSearch },
                { $or: yearSearch },
                { $or: schoolSearch }
            ]
        });
    } else if (search && skills && grad_years) {
        console.log('all filters applied...');
        users = await User.find({
            $and: [
                { $text: { $search: search } },
                { $and: skillSearch },
                { $or: yearSearch }
            ]
        });
    } else if (search && skills && schools) {
        console.log('all filters applied...');
        users = await User.find({
            $and: [
                { $text: { $search: search } },
                { $and: skillSearch },
                { $or: schoolSearch }
            ]
        });
    } else if (search && grad_years && schools) {
        console.log('all filters applied...');
        users = await User.find({
            $and: [
                { $text: { $search: search } },
                { $or: yearSearch },
                { $or: schoolSearch }
            ]
        });
    } else if (skills && grad_years && schools) {
        console.log('all filters applied...');
        users = await User.find({
            $and: [
                { $and: skillSearch },
                { $or: yearSearch },
                { $or: schoolSearch }
            ]
        });
    } else if (search && skills) {
        console.log('all filters applied...');
        users = await User.find({
            $and: [
                { $text: { $search: search } },
                { $and: skillSearch }
            ]
        });
    } else if (search && grad_years) {
        console.log('all filters applied...');
        users = await User.find({
            $and: [
                { $text: { $search: search } },
                { $or: yearSearch }
            ]
        });
    } else if (search && schools) {
        console.log('all filters applied...');
        users = await User.find({
            $and: [
                { $text: { $search: search } },
                { $or: schoolSearch }
            ]
        });
    } else if (skills && grad_years) {
        console.log('only skill and year filters applied');
        users = await User.find({
            $and: [
                { $and: skillSearch },
                { $or: yearSearch }
            ]
        });
    } else if (skills && schools) {
        console.log('only skill and school filters applied');
        users = await User.find({
            $and: [
                { $and: skillSearch },
                { $or: schoolSearch }
            ]
        });
    } else if (grad_years && schools) {
        console.log('only year and school filters applied');
        users = await User.find({
            $and: [
                { $or: yearSearch },
                { $or: schoolSearch }
            ]
        });
    } else if (search) {
        console.log(`searching for ${search}..`);
        users = await User.find(
             { $text: { $search: search } }
        )
        console.log(users);
    } else if (skills) {
        console.log('only skill filter(s) applied');
        users = await User.find({
            $and: skillSearch
        });
    } else if (grad_years) {
        console.log('only year filter(s) applied');
        users = await User.find({
            $or: yearSearch
        });
    } else if (schools) {
        console.log('only school filter(s) applied');
        users = await User.find({
            $or: schoolSearch
        });
        console.log(users);
    } else {
        console.log('no filters applied');
        users = await User.find({});
    }

    if (!users) {
        return null;
    }

    users.sort(function (a, b) { return a.name.toLowerCase() - b.name.toLowerCase() });
    return users;
}

let updateUser = async function(args) {
    return User.findOneAndUpdate({'uuid':args.uuid}, { "$set": args }, { new: true });
}

let getUserProfile = async function (args) {
    return await User.findOne({uuid: args.uuid}).populate('team');
}

let addUserToTeam = async function(args) {

	User.findByIdAndUpdate(args.user_id, {
		"$set": {
			"team": args.team_id
		}
	})
	return await Team.findByIdAndUpdate(args.team_id, {
		"$push": {
			"members": args.user_id
		}
	})
}


// let createTeam = async function(args) {
//
// }

let toggleVisibility = async function (args) {
    return User.findOneAndUpdate({'uuid':args.uuid}, {"$bit": {visible: {xor: 1}}}, {new:true})
}

let apiRouter = express.Router();

const root = {
    user: getUser,
    update_user: updateUser,
    user_profile: getUserProfile,
    toggle_visibility: toggleVisibility,
	add_user_to_team: addUserToTeam,
	get_teams: getTeams
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
