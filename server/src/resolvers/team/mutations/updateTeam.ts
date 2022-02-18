import { Team, User } from "../../../models";
import { IUserMongoose, ITeamMongoose } from "../../../types";

const updateTeam = async function (
  parent,
  args,
  context,
  info,
  req
): Promise<ITeamMongoose | null> {
  let user: IUserMongoose | null = await User.findById(context._id).populate(
    "team"
  );
  if (!user) {
    throw new Error("User not found");
  }
  if (!user.team) {
    throw new Error("User not on team");
  }
  return await Team.findByIdAndUpdate(user.team, { $set: args }, { new: true });
}; // consider taking in team-id instead of automatically using logged in user's team id

export default updateTeam;
