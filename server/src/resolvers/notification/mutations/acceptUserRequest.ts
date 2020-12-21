import { Team, User, Notification } from "../../../models";
import {
  IUserMongoose,
  ITeamMongoose,
  INotificationMongoose,
} from "../../../types";
import { GraphQLError } from "graphql";
import { sendSlackMessage } from "../../../utils";

const acceptUserRequest = async function (
  parent,
  args,
  context,
  info,
  req
): Promise<ITeamMongoose | null> {
  let user = await User.findById(context._id);
  if (!user) {
    throw new Error("User not found");
  }

  let notification: INotificationMongoose | null = await Notification.findById(
    args.notification_id
  )
    .populate("sender")
    .populate("receiver");
  if (!notification) {
    throw new GraphQLError("Notification not found");
  }

  if (notification.receiver._id.toString() != user._id.toString()) {
    throw new GraphQLError("Notification not valid");
  }
  await Notification.findByIdAndUpdate(notification._id, {
    resolved: true,
  });
  if (notification.senderType == "Team") {
    if (user.team) {
      throw new GraphQLError("User already on team");
    }
    if (!notification.sender) {
      throw new GraphQLError("Team no longer exists");
    }
    if (notification.sender.members.length >= 4) {
      throw new GraphQLError("Team is full");
    }
    let team = await Team.findByIdAndUpdate(notification.sender._id, {
      $push: {
        members: user,
      },
    }).populate("members");

    await User.findByIdAndUpdate(context._id, {
      team: notification.sender._id,
    });

    let teamSlackIDs: any = [];
    team!.members.forEach((member) => {
      teamSlackIDs.push(member.slackid);
    });

    var index = teamSlackIDs.indexOf(user.slackid);
    if (index != -1) {
      teamSlackIDs.splice(index, 1);
    }
    teamSlackIDs.forEach((id) => {
      sendSlackMessage(
        `${context.name} has accepted your request. View your team here: https://teamformation.hack.gt/feed`,
        id
      );
    });
    return team;
  } else if (notification.senderType == "User") {
    let user1: IUserMongoose | null = await User.findById(context._id);
    let user2: IUserMongoose | null = await User.findById(notification.sender);
    if (user1 && user2) {
      if (user1.team) {
        throw new Error("User already on a team!");
      }
      if (user2.team) {
        throw new Error("Requesting user already on team");
      }
      var team: ITeamMongoose = new Team({
        name: "Team " + user1._id + "" + user2._id,
        members: [user1, user2],
        public: true,
      });

      if(!team) {
          throw new GraphQLError("Error creatiing team object");
      }
      
      return await team.save(function (err, team) {
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
        user1.save(function (err) {
          if (err) {
            console.log(err);
            throw new GraphQLError(err);
          }
        });
        user2.save(function (err) {
          if (err) {
            console.log(err);
            throw new GraphQLError(err);
          }
        });
        sendSlackMessage(
          `${context.name} has accepted your request. View your team here: https://teamformation.hack.gt/feed`,
          user2.slackid
        );
        console.log("slack message sent");
      });
    } else {
      throw new GraphQLError("User not defined");
    }
  } else {
    throw new GraphQLError("Notification invalid");
  }
};

export default acceptUserRequest;
