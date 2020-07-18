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
import { IUser, User, Notification, Team} from "./schema";
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
	}).populate('members')
}
let getUser = async function (args) {
    let users;
    if(args.skill == "" || args.skill == null) {
        users = await User.find({});
    } else {
        const skills = args.skill.match(/\w+/g) ;
        let search = [] as {}[];
        for (let i = 0; i < skills.length; i++) {
            search.push({ skills: { "$elemMatch": { "$regex": '.*' + skills[i] + '.*', "$options": 'i' } } })
        }
        users = await User.find({
            $and: search
        });
    }

    if (!users) {
        return null;
    }

    users.sort(function (a, b) { return a.name.toLowerCase() - b.name.toLowerCase() });
    return users;
}

let updateUser = async function(args, req) {
	console.log(req.user)
    return User.findByIdAndUpdate(req.user._id, { "$set": args }, { new: true });
}

let getUserProfile = async function (args, req) {
    return await User.findById(req.user._id).populate('team');
}

let addUserToTeam = async function(args, req) {
	if(!req.user) {
		throw new Error('User is not logged in')
	}
	User.findByIdAndUpdate(args.user_id, {
		"$set": {
			"team": args.team_id
		}
	})
	return await Team.findByIdAndUpdate(args.team_id, {
		"$push": {
			"members": req.user._id
		}
	})
}

let joinUsersInTeam = async function(args, req) {
	if(!req.user) {
		throw new Error('User not logged in')
	}
	let user1 = await User.findById(req.user._id)
	let user2 = await User.findById(args.user2)
	console.log(user1 + " " + user2)
	if(user1 && user2)  {
		if(user1.team) {
			throw new Error("User1 already on a team!");
		}
		if(user2.team) {
			throw new Error("User2 already on team");
		}
		var team = new Team({
			name: "Team " + user1._id + '' + user2._id,
			members: [user1, user2],
			public: true
		})
		return await team.save(function (err, team) {
		    if (err) {
				console.log(err)
			}
			if(!user1) {
				throw new Error("User1 not defined")
			}
			if(!user2) {
				throw new Error("User2 not defined")
			}
			user1.team = team
			user2.team = team
			user1.save(function (err) {
				console.log(err)
				throw new Error(err)
			})
			user2.save(function (err) {
				console.log(err)
				throw new Error(err)
			})
	  	});
	} else {
		throw new Error('User not defined')
	}
}

let makeUserRequest = async function(args, req) {
	if(!req.user) {
		throw new Error('User not loggeed in')
	}
	let notification
	let receiver_id = args.user_id
	let receiver = await User.findById(receiver_id)
	if(!receiver) {
		throw new Error("Receiver user not found")
	}
	if(receiver.team) {
		throw new Error("Requested user already on team")
	}
	if(!req.user.team) {
		notification = await new Notification({
			bio: args.bio,
			idea: args.idea,
			senderType: 'User',
			receiverType: 'User',
			sender: req.user._id,
			receiver: receiver_id,
			resolved: false
		});

	} else {
		let team = await Team.findById(req.user.team)
		if(!team) {
			throw new Error("Team not found")
		}
		notification = await new Notification({
			bio: args.bio,
			idea: args.idea,
			senderType: 'Team',
			receiverType: 'User',
			sender: team._id,
			receiver: receiver_id,
			resolved: false
		});
	}


	return await notification.save((err, notif) => {
		if(err) {
			throw new Error("Error creating notification: " + notif)
		}
		User.findByIdAndUpdate(receiver_id, {
			"$push": {
				"notifications": notif
			}
		})
	})
}

let makeTeamRequest = async function(args, req) {
	if(!req.user) {
		throw new Error('User not logged in')
	}
	let user = await User.findById(req.user._id)
	let team_id = args.team_id
	if(!user) {
		throw new Error("User not found!")
	}
	if(user.team) {
		throw new Error("You are already on a team!")
	}
	let notification = await new Notification({
		bio: args.bio,
		idea: args.idea,
		senderType: 'User',
		receiverType: 'Team',
		sender: user,
		receiver: team_id,
		resolved: false
	})

	return await notification.save((err, notif) => {
		if(err) {
			throw new Error("Error creating notification: " + notif)
		}
		Team.findByIdAndUpdate(team_id, {
			"$push": {
				"notifications": notif
			}
		})
	});
}

let getUserNotifications = async function(args, req) {
	if(!req.user) {
		throw new Error('User not logged in')
	}
	return await Notification.find({
		receiverType: 'User',
		receiver: req.user._id,
		resolved: false
	})
}

let getTeamNotifications = async function(args, req) {
	if(!req.user) {
		throw new Error('User not logged in')
	}
	if(!req.user.team) {
		throw new Error('User not on a team')
	}
	return await Notification.find({
		receiverType: 'Team',
		receiver: req.user.team,
		resolved: false
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
	get_teams: getTeams,
	join_users_in_team: joinUsersInTeam,
	make_team_request: makeTeamRequest,
	notifications: getUserNotifications,
	make_user_request: makeUserRequest,
	team_notifications: getTeamNotifications
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
