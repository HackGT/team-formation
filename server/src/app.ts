/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import fs from "fs";
import path from "path";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { GroundTruthStrategy } from "./routes/strategies";
import { IUser, User, Notification, Team, IUserMongoose } from "./schema";
import { userRoutes } from "./routes/user";
import sendSlackMessage from "./sendSlackMessage";

/* eslint-disable @typescript-eslint/no-var-requires */
const { ApolloServer, gql } = require("apollo-server-express");
const { uniqueNamesGenerator, adjectives, animals } = require("unique-names-generator");

dotenv.config();

const PORT = 3000;
const typeDefs = gql`
  ${fs.readFileSync(path.resolve(__dirname, "../api.graphql"), "utf8")}
`;
const VERSION_NUMBER = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")
).version;

export const app = express();

if (process.env.ISPRODUCTION === "true") {
  app.enable("trust proxy");
} else {
  console.warn("OAuth callback(s) running in development mode");
}

app.use(morgan("dev"));
app.use(compression());
app.use(cors());
const sessionSecret = process.env.SECRET;
if (!sessionSecret) {
  throw new Error("Secret not specified");
}
app.use(
  session({
    secret: sessionSecret,
    saveUninitialized: false,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

export function loggedInErr(req, res, next) {
  if (req.user) {
    res.status(200).json({
      success: true,
    });
    next();
  } else {
    res.status(401).json({ error: "User not logged in", success: false });
  }
}

const gturl = String(process.env.GROUNDTRUTHURL || "login.hack.gt");
const groundTruthStrategy = new GroundTruthStrategy(gturl);
passport.use(groundTruthStrategy);
passport.serializeUser<IUser, string>((user, done) => {
  done(null, user.uuid);
});
passport.deserializeUser((id: string, done) => {
  User.findOne({ uuid: id }, (err, user) => {
    done(err, user!);
  });
});

const getTeam = async function (parent, args, context, info, req) {
  if (!context._id) {
    throw new Error("User is not logged in!");
  }
  const team = await Team.findById(args.team_id).populate("members");
  if (!team) {
    throw new Error("Team not found!");
  }
  return team;
};
const getTeams = async function (parent, args, context, info, req) {
  console.log("getting teams..");
  let teams;
  let search;
  let interests;
  const interestSearch = [] as {}[];

  if (args.search) {
    search = `"${args.search.split(" ").join('" "')}"`;
  }

  if (args.interests) {
    interests = args.interests.match(/\w+/g);
    for (let i = 0; i < interests.length; i++) {
      interestSearch.push({
        interests: {
          $elemMatch: { $regex: `.*${interests[i]}.*`, $options: "i" },
        },
      });
    }
  }

  if (search && interests) {
    teams = await Team.find({
      $and: [{ public: true }, { $text: { $search: search } }, { $and: interestSearch }],
    }).populate("members");
  } else if (search) {
    teams = await Team.find({
      $and: [{ public: true }, { $text: { $search: search } }],
    }).populate("members");
  } else if (interests) {
    teams = await Team.find({
      $and: [{ public: true }, { $and: interestSearch }],
    }).populate("members");
  } else {
    teams = await Team.find({
      public: true,
    }).populate("members");
  }

  if (!teams) {
    return null;
  }

  teams.sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase());
  return teams;
};

const getUser = async function (parent, args, context, info, req) {
  if (!context._id) {
    throw new Error("User not logged in");
  }
  const user = await User.findById(args.user_id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

// Query object for filters
interface UserQuery {
  $text?: {};
  skills?: {};
  grad_year?: {};
  school?: {};
  track?: {};
  visible?: {};
  location?: {};
}

/**
 * Builds a object containing the information to query for when filtering users
 * @param search Search string to regex match any part of a profile
 * @param skills Array of skills to find users by
 * @param grad_years Graduation years, represented by strings, of users
 * @param schools Universities and higher education institutions of users
 * @param tracks Tracks being offered by current hackathon, if applicable
 */
const buildQuery = (
  search?: string,
  skills?: Array<string>,
  grad_years?: Array<string>,
  schools?: Array<string>,
  tracks?: Array<string>,
  locations?: Array<string>
): UserQuery => {
  const query: UserQuery = {};
  if (search) {
    query.$text = { $search: search.split(" ").join(" ") };
  }
  if (skills) {
    query.skills = { $all: skills };
  }
  if (grad_years) {
    query.grad_year = { $in: grad_years };
  }
  if (schools) {
    query.school = { $in: schools };
  }
  if (tracks) {
    query.track = { $in: tracks };
  }
  if (locations) {
    query.location = { $in: locations };
  }
  query.visible = 1;
  return query;
};

// This will replace the getUsers function
async function getUsers(parent, args, context, info, req): Promise<IUserMongoose[]> {
  if (!context._id) {
    throw new Error("User not logged in");
  }

  const { search } = args;
  const skills: string[] = args.skill ? args.skill.split(",") : undefined;
  const gradYears: string[] = args.grad_year ? args.grad_year.split(",") : undefined;
  const schools: string[] = args.school ? args.school.split(",") : undefined;
  const tracks: string[] = args.track ? args.track.split(",") : undefined;
  const locations: string[] = args.location ? args.location.split(",") : undefined;
  const query = buildQuery(search, skills, gradYears, schools, tracks, locations);

  let users = await User.find(query);

  users = users
    .sort((a: IUserMongoose, b: IUserMongoose) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    )
    .filter(item => item.uuid !== context.uuid && !item.team && item.visible === 1);
  return users;
}

const updateUser = async function (parent, args, context, info, req) {
  console.log(context._id);
  if (!context._id) {
    throw new Error("User not logged in");
  }
  return await User.findByIdAndUpdate(context._id, { $set: args }, { new: true });
};

const updateTeam = async function (parent, args, context, info, req) {
  console.log(context._id);
  if (!context._id) {
    throw new Error("User not logged in");
  }
  const user = await User.findById(context._id).populate("team");
  if (!user) {
    throw new Error("User not found");
  }
  if (!user.team) {
    throw new Error("User not on team");
  }
  return await Team.findByIdAndUpdate(user.team, { $set: args }, { new: true });
};

const leaveTeam = async function (parent, args, context, info, req) {
  if (!context._id) {
    throw new Error("User not logged in");
  }
  if (!context.team) {
    throw new Error("User not on team");
  }

  await Team.findByIdAndUpdate(
    context.team,
    {
      $pull: {
        members: context._id,
      },
    },
    async (err, team) => {
      if (err || !team) {
        console.log(err);
        throw new Error("Issue updating team");
      }
      console.log("TTTEAM", team);
      if (team.members.length <= 1) {
        await Team.findByIdAndDelete(context.team);
      }
    }
  );

  return await User.findByIdAndUpdate(context._id, {
    team: null,
  });
};

const getSentTeamNotifications = async function (parent, args, context, info, req) {
  if (!context._id) {
    throw new Error("User not logged in");
  }
  const user = await User.findById(context._id);
  if (!user) {
    throw new Error("User not found");
  }
  if (!user.team) {
    throw new Error("User not on teams");
  }
  return await Notification.find({
    sender: user.team,
    resolved: false,
  }).populate("receiver");
};

const getUserProfile = async function (parent, args, context, info, req) {
  return await User.findById(context._id).populate("team");
};

/*
    Accepting a user sending request to team
 */
const acceptTeamRequest = async function (parent, args, context, info, req) {
  if (!context._id) {
    throw new Error("User not logged in");
  }
  const user = await User.findById(context._id).populate("team");
  if (!user) {
    throw new Error("User not found");
  }
  if (!user.team) {
    throw new Error("User not on team");
  }
  if (user.team.members.length >= 4) {
    throw new Error("Team is full");
  }
  const notification = await Notification.findById(args.notification_id)
    .populate("sender")
    .populate("receiver");
  if (!notification) {
    throw new Error("Notification does not exist");
  }
  if (notification.senderType == "Team") {
    throw new Error("Cannot accept request from a team");
  }
  if (notification.senderType == "User") {
    console.log("TEAM", user.team._id.toString(), notification.receiver._id.toString());

    if (user.team._id.toString() !== notification.receiver._id.toString()) {
      throw new Error("Team does not own notification");
    }
    const requestUser = await User.findById(notification.sender._id);
    if (!requestUser) {
      throw new Error("Notificaton sender not found");
    }
    if (requestUser.team) {
      throw new Error("Sender already on team");
    }
    console.log("here2");

    const requestedUserId = requestUser._id;
    console.log(requestedUserId);
    console.log(user.team._id);
    console.log(mongoose.Types.ObjectId.isValid(requestedUserId));
    console.log(mongoose.Types.ObjectId.isValid(user.team._id));

    await Team.findByIdAndUpdate(
      user.team._id,
      {
        $push: {
          members: requestedUserId,
        },
      },
      err => {
        console.log(err);
      }
    );
    await User.findByIdAndUpdate(notification.sender._id, {
      team: user.team._id,
    });
    await Notification.updateMany(
      { sender: notification.sender._id, receiver: notification.receiver._id },
      {
        resolved: true,
      }
    );

    sendSlackMessage(
      `${user?.team?.name} has accepted your request. View your new team here: https://teamformation.hack.gt/team/${user.team._id}`,
      requestUser.slackid
    );
  } else {
    throw new Error("Notification invalid");
  }
};

const acceptUserRequest = async function (parent, args, context, info, req) {
  if (!context._id) {
    throw new Error("User not logged in");
  }
  const user = await User.findById(context._id);
  if (!user) {
    throw new Error("User not found");
  }

  const notification = await Notification.findById(args.notification_id)
    .populate("sender")
    .populate("receiver");
  if (!notification) {
    throw new Error("Notification not found");
  }
  console.log("ACCEPT USER REQUEST");
  console.log(notification.receiver._id);
  console.log(user._id);

  if (notification.receiver._id.toString() != user._id.toString()) {
    throw new Error("Notification not valid");
  }
  await Notification.findByIdAndUpdate(notification._id, {
    resolved: true,
  });
  if (notification.senderType === "Team") {
    if (user.team) {
      throw new Error("User already on team");
    }
    if (!notification.sender) {
      throw new Error("Team no longer exists");
    }
    if (notification.sender.members.length >= 4) {
      throw new Error("Team is full");
    }
    const team = await Team.findByIdAndUpdate(notification.sender._id, {
      $push: {
        members: user,
      },
    }).populate("members");
    await User.findByIdAndUpdate(context._id, {
      team: notification.sender._id,
    });
    const teamSlackIDs: any = [];
    team?.members.forEach(member => {
      teamSlackIDs.push(member.slackid);
    });
    const index = teamSlackIDs.indexOf(user.slackid);
    if (index != -1) {
      teamSlackIDs.splice(index, 1);
    }
    teamSlackIDs.forEach(id => {
      sendSlackMessage(
        `${context.name} has accepted your request. View your team here: https://teamformation.hack.gt/feed`,
        id
      );
    });
    console.log("slack message sent");
    return team;
  }
  if (notification.senderType == "User") {
    const user1 = await User.findById(context._id);
    const user2 = await User.findById(notification.sender);
    if (user1 && user2) {
      if (user1.team) {
        throw new Error("User already on a team!");
      }
      if (user2.team) {
        throw new Error("Requesting user already on team");
      }
      const capitalizedName: string = uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        style: "capital",
      });
      const team = new Team({
        name: `Team ${capitalizedName}`,
        members: [user1, user2],
        public: true,
      });
      return await team.save((err, team) => {
        if (err) {
          console.log(err);
        }
        if (!user1) {
          throw new Error("User1 not defined");
        }
        if (!user2) {
          throw new Error("User2 not defined");
        }
        user1.team = team;
        user2.team = team;
        user1.save(err => {
          if (err) {
            console.log(err);
            throw new Error(err);
          }
        });
        user2.save(err => {
          if (err) {
            console.log(err);
            throw new Error(err);
          }
        });
        sendSlackMessage(
          `${context.name} has accepted your request. View your team here: https://teamformation.hack.gt/feed`,
          user2.slackid
        );
        console.log("slack message sent");
      });
    }
    throw new Error("User not defined");
  } else {
    throw new Error("Notification invalid");
  }
};

const makeUserRequest = async function (parent, args, context, info, req) {
  if (!context._id) {
    throw new Error("User not logged in");
  }
  let notification;
  const receiver_id = args.user_id;
  const receiver = await User.findById(receiver_id);
  let senderName = context.name;
  if (!receiver) {
    throw new Error("Receiver user not found");
  }
  if (receiver.team) {
    throw new Error("Requested user already on team");
  }
  if (!context.team) {
    notification = new Notification({
      bio: args.bio,
      idea: args.idea,
      senderType: "User",
      receiverType: "User",
      sender: context._id,
      receiver: receiver_id,
      resolved: false,
    });
  } else {
    const team = await Team.findById(context.team);
    if (!team) {
      throw new Error("Team not found");
    }
    notification = new Notification({
      bio: args.bio,
      idea: args.idea,
      senderType: "Team",
      receiverType: "User",
      sender: team._id,
      receiver: receiver_id,
      resolved: false,
    });
    senderName = team.name;
  }

  return await notification.save((err, notif) => {
    if (err) {
      throw new Error(`Error creating notification: ${notif}`);
    }
    User.findByIdAndUpdate(receiver_id, {
      $push: {
        notifications: notif,
      },
    });
    sendSlackMessage(
      `You have received a request from ${senderName}. Accept or deny the request here: https://teamformation.hack.gt/feed`,
      receiver?.slackid
    );
    if (!context.team) {
      sendSlackMessage(`You have sent a request to ${receiver!.name}`, context.slackid);
    }
    console.log("slack message sent");
  });
};

const makeTeamRequest = async function (parent, args, context, info, req) {
  if (!context._id) {
    throw new Error("User not logged in");
  }
  const user = await User.findById(context._id);
  const { team_id } = args;

  const team = await Team.findById(team_id).populate("members");

  console.log("TEAM_ID: ", team_id);
  if (!user) {
    throw new Error("User not found!");
  }
  if (user.team) {
    throw new Error("You are already on a team!");
  }
  const notification = new Notification({
    bio: args.bio,
    idea: args.idea,
    senderType: "User",
    receiverType: "Team",
    sender: user._id,
    receiver: team_id,
    resolved: false,
  });

  return await notification.save((err, notif) => {
    if (err) {
      throw new Error(`Error creating notification: ${notif}`);
    }
    Team.findByIdAndUpdate(team_id, {
      $push: {
        notifications: notif,
      },
    });
    const teamSlackIDs: any = [];
    team?.members.forEach(member => {
      console.log(member.slackid);
      teamSlackIDs.push(member.slackid);
      console.log(member.slackid);
    });
    teamSlackIDs.forEach(id => {
      sendSlackMessage(
        `You have received a request from ${context.name}. Accept or deny the request here: https://teamformation.hack.gt/team/${team_id}`,
        id
      );
    });
    sendSlackMessage(`You have sent a request to ${team!.name}`, user!.slackid);
  });
};

const getUserNotifications = async function (parent, args, context, info, req) {
  if (!context._id) {
    throw new Error("User not logged in");
  }
  return await Notification.find({
    receiverType: "User",
    receiver: context._id,
    resolved: false,
  }).populate("sender");
};

const getTeamNotifications = async function (parent, args, context, info, req) {
  if (!context._id) {
    throw new Error("User not logged in");
  }
  if (!context.team) {
    throw new Error("User not on a team");
  }
  return await Notification.find({
    receiverType: "Team",
    receiver: context.team,
    resolved: false,
  })
    .populate("sender")
    .populate("receiver");
};

const toggleVisibility = async function (parent, args, context, info, req) {
  return User.findByIdAndUpdate(context._id, { $bit: { visible: { xor: 1 } } }, { new: true });
};

const apiRouter = express.Router();

const resolvers = {
  Source: {
    __resolveType(obj, context, info) {
      if (context.team) {
        return "User";
      }
      if (context._id) {
        return "Team";
      }
      return null;
    },
  },
  Query: {
    users: getUsers,
    user_profile: getUserProfile,
    teams: getTeams,
    team: getTeam,
    notifications: getUserNotifications,
    team_notifications: getTeamNotifications,
    sent_team_notifications: getSentTeamNotifications,
    user: getUser,
  },
  Mutation: {
    toggle_visibility: toggleVisibility,
    update_user: updateUser,
    update_team: updateTeam,
    accept_user_request: acceptUserRequest,
    accept_team_request: acceptTeamRequest,
    make_team_request: makeTeamRequest,
    make_user_request: makeUserRequest,
    leave_team: leaveTeam,
  },
};

apiRouter.use("/user", userRoutes);

app.use("/api", apiRouter);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => req.user,
  playground: {
    settings: {
      "editor.theme": "dark",
      "request.credentials": "include",
    },
  },
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
