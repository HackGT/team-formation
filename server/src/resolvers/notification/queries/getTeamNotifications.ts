import { Notification } from "../../../models";
import { GraphQLError } from "graphql";
import { INotificationMongoose } from "../../../types";

const getTeamNotifications = async function (
  parent,
  args,
  context,
  info,
  req
): Promise<INotificationMongoose[] | null> {
  if (!context.team) {
    throw new GraphQLError("User not on a team");
  }
  
  if (args.sent) {
    return await Notification.find({
      sender: context.team,
      resolved: false,
    }).populate("receiver");
  }

  return await Notification.find({
    receiverType: "Team",
    receiver: context.team,
    resolved: false,
  }).populate("sender");
};

export default getTeamNotifications;
