import fs from "fs";
import path from "path";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import passport from "passport";
import session from "express-session"
// import express_graphql from "express-graphql"
import cors from "cors"
import dotenv from "dotenv"
const { ApolloServer, gql } = require('apollo-server-express');
// import { buildSchema } from "graphql"
import { GroundTruthStrategy } from "./routes/strategies"
import { IUser, User, Notification, Team } from "./schema";
import { userRoutes } from "./routes/user";

dotenv.config();

const PORT = 3000;
const typeDefs = gql`${fs.readFileSync(path.resolve(__dirname, "../api.graphql"), "utf8")}`;
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
    secret: session_secret,
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
let getTeams = async function(parent, args, context, info, req) {
    console.log('getting teams..')
    let teams;
    let search;
    let interests;
    let interestSearch = [] as {}[];

    if (args.search) {
        search = '\"' + args.search.split(' ').join('\" \"') + '\"';
    }

    if (args.interests) {
        interests = args.interests.match(/\w+/g);
        for (let i = 0; i < interests.length; i++) {
            interestSearch.push({ interests: { "$elemMatch": { "$regex": '.*' + interests[i] + '.*', "$options": 'i' } } })
        }
    }

    if (search && interests) {
        console.log('search and interest filters applied')
        teams = await Team.find({
            $and: [
                { "public": true },
                { $text: { $search: search } },
                { $and: interestSearch }
            ]
        }).populate('members');
    } else if (search) {
        console.log(`searching for ${search}..`)
        teams = await Team.find({
            $and: [
                { "public": true },
                { $text: { $search: search } }
            ]
        }).populate('members');
    } else if (interests) {
        console.log(`interest filter(s) applied: ${interestSearch}`);
        teams = await Team.find({
            $and: [
                { "public": true },
                { $and: interestSearch }
            ]
        }).populate('members');
    } else {
        console.log('no filter applied');
        teams = await Team.find({
            "public": true
        }).populate('members')
    }

    if (!teams) {
        return null;
    }

    teams.sort(function(a, b) { return a.name.toLowerCase() - b.name.toLowerCase() });
    return teams;
}

let getUser = async function(parent, args, context, info, req) {
    if (!context._id) {
        throw new Error('User not logged in')
    }
    let user = await User.findById(context._id)
    if (!user) {
        throw new Error('User not found')
    }
    return user
}

let getUsers = async function(parent, args, context, info, req) {
    if (!context._id) {
        throw new Error('User not logged in')
    }
    console.log('getting users..')
    let users;
    let search;
    let skills;
    let grad_years;
    let schools;
    let skillSearch = [] as {}[];
    let yearSearch = [] as {}[];
    let schoolSearch = [] as {}[];

    if (args.search) {
        search = '\"' + args.search.split(' ').join('\" \"') + '\"';
    }
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
        console.log('search, skills, and grad year filters applied...');
        users = await User.find({
            $and: [
                { $text: { $search: search } },
                { $and: skillSearch },
                { $or: yearSearch }
            ]
        });
    } else if (search && skills && schools) {
        console.log('search, skills, and schools filters applied...');
        users = await User.find({
            $and: [
                { $text: { $search: search } },
                { $and: skillSearch },
                { $or: schoolSearch }
            ]
        });
    } else if (search && grad_years && schools) {
        console.log('searc, grad year, and schools filters applied...');
        users = await User.find({
            $and: [
                { $text: { $search: search } },
                { $or: yearSearch },
                { $or: schoolSearch }
            ]
        });
    } else if (skills && grad_years && schools) {
        console.log('skills, grad year, and schools filter applied...');
        users = await User.find({
            $and: [
                { $and: skillSearch },
                { $or: yearSearch },
                { $or: schoolSearch }
            ]
        });
    } else if (search && skills) {
        console.log('search and skills filters applied...');
        users = await User.find({
            $and: [
                { $text: { $search: search } },
                { $and: skillSearch }
            ]
        });
    } else if (search && grad_years) {
        console.log('search and grad year filters applied...');
        users = await User.find({
            $and: [
                { $text: { $search: search } },
                { $or: yearSearch }
            ]
        });
    } else if (search && schools) {
        console.log('search and schools filters applied...');
        users = await User.find({
            $and: [
                { $text: { $search: search } },
                { $or: schoolSearch }
            ]
        });
    } else if (skills && grad_years) {
        console.log('skill and year filters applied');
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

    users.sort(function(a, b) { return a.name.toLowerCase() - b.name.toLowerCase() });
    return users;
}

let updateUser = async function(parent, args, context, info, req) {
    console.log(context._id)
    if(!context._id) {
        throw new Error('User not logged in')
    }
    return User.findByIdAndUpdate(context._id, { "$set": args }, { new: true });
}

let getUserProfile = async function(parent, args, context, info, req) {
    return await User.findById(context._id).populate('team');
}

let acceptTeamRequest = async function(parent, args, context, info, req) {
    if (!context._id) {
        throw new Error('User not logged in')
    }
    let user = await User.findById(context._id).populate('team')
    if (!user) {
        throw new Error('User not found')
    }
    if (!user.team) {
        throw new Error('User not on team')
    }
    if (user.team.members.length >= 4) {
        throw new Error('Team is full')
    }
    let notification = await Notification.findById(args.notification_id).populate('sender')
    if (!notification) {
        throw new Error('Notification does not exist')
    }
    if (notification.senderType == 'Team') {
        throw new Error('Cannot accept request from a team')
    }
    if (notification.senderType == 'User') {
        if (user.team != notification.receiver) {
            throw new Error('Team does not own notification')
        }
        let requestUser = await User.findById(notification.sender._id);
        if (!requestUser) {
            throw new Error('Notificaton sender not found')
        }
        if (requestUser.team) {
            throw new Error('Sender already on team')
        }

        let updatedTeam = await Team.findByIdAndUpdate(user.team, {
            'members': {
                '$push': {
                    requestUser
                }
            }
        })
        await User.findByIdAndUpdate(notification.sender._id, {
            'team': updatedTeam
        })
    }
    throw new Error('Notification invalid')
}
let acceptUserRequest = async function(parent, args, context, info, req) {
    if (!context._id) {
        throw new Error('User not logged in')
    }
    let user = await User.findById(context._id)
    if (!user) {
        throw new Error('User not found')
    }

    let notification = await Notification.findById(args.notification_id).populate('sender')
    if (!notification) {
        throw new Error('Notification not found')
    }
    if (notification.receiver != user._id) {
        throw new Error('Notification not valid')
    }
    await Notification.findByIdAndUpdate(args.notification._id, {
        'resolved': true
    })
    if (notification.senderType == 'Team') {
        if (user.team) {
            throw new Error('User already on team')
        }
        if (!notification.sender) {
            throw new Error('Team no longer exists')
        }

        if (notification.sender.members.length >= 4) {
            throw new Error('Team is full')
        }
        let team = await Team.findByIdAndUpdate(notification.sender._id, {
            'members': {
                '$push': {
                    user
                }
            }
        })
        await User.findByIdAndUpdate(context._id, {
            'team': notification.sender._id
        })
        return team

    } else if (notification.senderType == 'User') {
        let user1 = await User.findById(context._id)
        let user2 = await User.findById(notification.sender)
        console.log(user1 + " " + user2)
        if (user1 && user2) {
            if (user1.team) {
                throw new Error("User already on a team!");
            }
            if (user2.team) {
                throw new Error("Requesting user already on team");
            }
            var team = new Team({
                name: "Team " + user1._id + '' + user2._id,
                members: [user1, user2],
                public: true
            })
            return await team.save(function(err, team) {
                if (err) {
                    console.log(err)
                }
                if (!user1) {
                    throw new Error("User1 not defined")
                }
                if (!user2) {
                    throw new Error("User2 not defined")
                }
                user1.team = team
                user2.team = team
                user1.save(function(err) {
                    console.log(err)
                    throw new Error(err)
                })
                user2.save(function(err) {
                    console.log(err)
                    throw new Error(err)
                })
            });
        } else {
            throw new Error('User not defined')
        }

    }
    throw new Error('Notification invalid')

}

let makeUserRequest = async function(parent, args, context, info, req) {
    if (!context._id) {
        throw new Error('User not loggeed in')
    }
    let notification
    let receiver_id = args.user_id
    let receiver = await User.findById(receiver_id)
    if (!receiver) {
        throw new Error("Receiver user not found")
    }
    if (receiver.team) {
        throw new Error("Requested user already on team")
    }
    if (!context.team) {
        notification = await new Notification({
            bio: args.bio,
            idea: args.idea,
            senderType: 'User',
            receiverType: 'User',
            sender: context._id,
            receiver: receiver_id,
            resolved: false
        });

    } else {
        let team = await Team.findById(context.team)
        if (!team) {
            throw new Error("Team not found")
        }
        notification = await new Notification({
            bio: args.bio,
            idea: args.idea,
            senderType: 'Team',
            receiverType: 'User',
            sender: team,
            receiver: receiver_id,
            resolved: false
        });
    }


    return await notification.save((err, notif) => {
        if (err) {
            throw new Error("Error creating notification: " + notif)
        }
        User.findByIdAndUpdate(receiver_id, {
            "$push": {
                "notifications": notif
            }
        })
    })
}

let makeTeamRequest = async function(parent, args, context, info, req) {
    if (!context._id) {
        throw new Error('User not logged in')
    }
    let user = await User.findById(context._id)
    let team_id = args.team_id
    if (!user) {
        throw new Error("User not found!")
    }
    if (user.team) {
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
        if (err) {
            throw new Error("Error creating notification: " + notif)
        }
        Team.findByIdAndUpdate(team_id, {
            "$push": {
                "notifications": notif
            }
        })
    });
}

let getUserNotifications = async function(parent, args, context, info, req) {
    if (!context._id) {
        throw new Error('User not logged in')
    }
    return await Notification.find({
        receiverType: 'User',
        receiver: context._id,
        resolved: false
    }).populate('sender')
}

let getTeamNotifications = async function(parent, args, context, info, req) {
    if (!context._id) {
        throw new Error('User not logged in')
    }
    if (!context.team) {
        throw new Error('User not on a team')
    }
    return await Notification.find({
        receiverType: 'Team',
        receiver: context.team,
        resolved: false
    })
}

// let createTeam = async function(args) {
//
// }

let toggleVisibility = async function(parent, args, context, info, req) {
    return User.findByIdAndUpdate(context._id, { "$bit": { visible: { xor: 1 } } }, { new: true })
}

let apiRouter = express.Router();

const resolvers = {
	Source: {
		__resolveType(obj, context, info){
			console.log("OBJ")
			console.log(obj)
			console.log(context)
			console.log(info)
			if(context.team) {
				console.log("team chosen")
				return 'Team'
			}
			if(context._id){
				return 'User'
			}
			return null;
		}
	},
	Query: {
		users: getUsers,
	    user_profile: getUserProfile,
		get_teams: getTeams,
		notifications: getUserNotifications,
		team_notifications: getTeamNotifications,
		user: getUser
	},
	Mutation: {
		toggle_visibility: toggleVisibility,
		update_user: updateUser,
		accept_user_request: acceptUserRequest,
		accept_team_request: acceptTeamRequest,
		make_team_request: makeTeamRequest,
		make_user_request: makeUserRequest
	}
};

apiRouter.use("/user", userRoutes);

app.use("/api", apiRouter);

const server = new ApolloServer({
    typeDefs, resolvers, context: ({ req }) => {
        return req.user
    }, playground: {
        settings: {
            'editor.theme': 'dark',
            'request.credentials': 'include'
        },
    }
});

server.applyMiddleware({ app });
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema } as GraphQLServerOptions));
//
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


app.use(express.static(path.join(__dirname, "../../client/build")));
app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Team Formation system v${VERSION_NUMBER} started on port ${PORT}`);
});
