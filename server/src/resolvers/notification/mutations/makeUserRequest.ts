import { Team, User, Notification } from "../../../models";
import {
  IUserMongoose,
  INotificationMongoose,
  ITeamMongoose,
} from "../../../types";
import { GraphQLError } from "graphql";
import { sendSlackMessage } from "../../../utils";

const makeUserRequest = async function (
  parent,
  args,
  context,
  info,
  req
): Promise<INotificationMongoose | null> {
  let notification: INotificationMongoose;
  let receiver_id = args.user_id;
  let receiver: IUserMongoose | null = await User.findById(receiver_id);
  let senderName = context.name;
  if (!receiver) {
    throw new GraphQLError("Receiver user not found");
  }
  if (receiver.team) {
    throw new GraphQLError("Requested user already on team");
  }
  if (!context.team) {
    //if user is not on a team
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
    let team: ITeamMongoose | null = await Team.findById(context.team);
    if (!team) {
      throw new GraphQLError("Team not found");
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

  if(!notification) {
    throw new GraphQLError("Error creating notification object");
  }

  return await notification.save((err, notif) => {
    if (err) {
      throw new GraphQLError("Error creating notification: " + notif);
    }
    User.findByIdAndUpdate(receiver_id, {
      $push: {
        notifications: notif,
      },
    });
    sendSlackMessage(
      `You have received a request from ${senderName}. Accept or deny the request here: https://teamformation.hack.gt/feed`,
      receiver!.slackid
    );
    if (!context.team) {
      sendSlackMessage(
        `You have sent a request to ${receiver!.name}`,
        context.slackid
      );
    }
  });
};

export default makeUserRequest;
