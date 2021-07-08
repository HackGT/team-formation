import { Team, User, Notification } from "../../../models";
import {
  IUserMongoose,
  ITeamMongoose,
  INotificationMongoose,
} from "../../../types";
import { GraphQLError } from "graphql";
import { sendSlackMessage } from "../../../utils";

const makeTeamRequest = async function (
  parent,
  args,
  context,
  info,
  req
): Promise<INotificationMongoose | null> {
  let user: IUserMongoose | null = await User.findById(context._id);
  let team_id = args.team_id;

  let team: ITeamMongoose | null = await Team.findById(team_id).populate(
    "members"
  );

  if (!user) {
    throw new GraphQLError("User not found!");
  }
  if (user.team) {
    throw new GraphQLError("You are already on a team!");
  }
  let notification: INotificationMongoose = new Notification({
    bio: args.bio,
    idea: args.idea,
    senderType: "User",
    receiverType: "Team",
    sender: user._id,
    receiver: team_id,
    resolved: false,
  });

  if(!notification) {
    throw new GraphQLError("Error creating notification object");
  }

  return await notification.save((err, notif) => {
    if (err) {
      throw new GraphQLError("Error creating notification: " + notif);
    }
    Team.findByIdAndUpdate(team_id, {
      $push: {
        notifications: notif,
      },
    });
    let teamSlackIDs: any = [];
    team!.members.forEach((member) => {
      console.log(member.slackid);
      teamSlackIDs.push(member.slackid);
      console.log(member.slackid);
    });
    teamSlackIDs.forEach((id) => {
      sendSlackMessage(
        `You have received a request from ${context.name}. Accept or deny the request here: https://teamformation.hack.gt/team/${team_id}`,
        id
      );
    });
    sendSlackMessage(`You have sent a request to ${team!.name}`, user!.slackid);
  });
};

export default makeTeamRequest;
