import { Team, User, Notification } from "../../../models";
import {
  IUserMongoose,
  INotificationMongoose,
} from "../../../types";
import { GraphQLError } from "graphql";
import { sendSlackMessage } from "../../../utils";

const acceptTeamRequest = async function (
  parent,
  args,
  context,
  info,
  req
): Promise<INotificationMongoose | null> {
  let user: IUserMongoose | null = await User.findById(context._id).populate(
    "team"
  );
  if (!user) {
    throw new GraphQLError("User not found");
  }
  if (!user.team) {
    throw new GraphQLError("User not on team");
  }
  if (user.team.members.length >= 4) {
    throw new GraphQLError("Team is full");
  }
  let notification = await Notification.findById(args.notification_id)
    .populate("sender")
    .populate("receiver");
  if (!notification) {
    throw new GraphQLError("Notification does not exist");
  }
  if (notification.senderType == "Team") {
    throw new GraphQLError("Cannot accept request from a team");
  }
  if (notification.senderType == "User") {
    if (user.team._id.toString() !== notification.receiver._id.toString()) {
      throw new GraphQLError("Team does not own notification");
    }
    let requestUser = await User.findById(notification.sender._id);
    if (!requestUser) {
      throw new GraphQLError("Notificaton sender not found");
    }
    if (requestUser.team) {
      throw new GraphQLError("Sender already on team");
    }

    let requestedUserId = requestUser._id;

    await Team.findByIdAndUpdate(
      user.team._id,
      {
        $push: {
          members: requestedUserId,
        },
      },
      function (err, user) {
        throw new GraphQLError(err);
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
      `${
        user!.team!.name
      } has accepted your request. View your new team here: https://teamformation.hack.gt/team/${
        user.team._id
      }`,
      requestUser.slackid
    );
    return notification;
  } else {
    throw new Error("Notification invalid");
  }
};

export default acceptTeamRequest;
