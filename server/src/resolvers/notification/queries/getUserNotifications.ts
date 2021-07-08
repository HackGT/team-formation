import { Notification } from "../../../models";
import { INotificationMongoose  } from "../../../types";

const getUserNotifications = async function (
  parent,
  args,
  context,
  info,
  req
): Promise<INotificationMongoose[] | null> {
  return await Notification.find({
    receiverType: "User",
    receiver: context._id,
    resolved: false,
  }).populate("sender");
};

export default getUserNotifications;
