import { Team } from "../../../models";
import { GraphQLError } from "graphql";
import { ITeamMongoose } from "../../../types";

const getTeam = async function (
  parent,
  args,
  context,
  info,
  req
): Promise<ITeamMongoose | null> {
  let team: ITeamMongoose | null = await Team.findById(args.team_id).populate(
    "members"
  );
  if (!team) {
    throw new GraphQLError("Team not found!");
  }
  return team;
};

export default getTeam;
