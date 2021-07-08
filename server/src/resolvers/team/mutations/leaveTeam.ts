import { Team, User } from "../../../models";
import { GraphQLError } from "graphql";
import { IUserMongoose } from "../../../types";

const leaveTeam = async function (
  parent,
  args,
  context,
  info,
  req
): Promise<IUserMongoose | null> {
  if (!context.team) {
    throw new GraphQLError("User not on team");
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
        throw new GraphQLError("Issue updating team");
      }
      if (team.members.length <= 1) {
        await Team.findByIdAndDelete(context.team);
      }
    }
  );

  return await User.findByIdAndUpdate(context._id, {
    team: null,
  });
};

export default leaveTeam;
