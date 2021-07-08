import { Team } from "../../../models";
import { ITeamMongoose } from "../../../types";

const getTeams = async function (
  parent,
  args,
  context,
  info,
  req
): Promise<ITeamMongoose[] | null> {
  let teams: ITeamMongoose[];
  let search: String;
  let interests: String[];
  let interestSearch = [] as {}[];
  let andQuery = [] as {}[];
  if (args.search) {
    search = '"' + args.search.split(" ").join('" "') + '"';
    andQuery.push({ $text: { $search: search } });
  }

  if (args.interests) {
    interests = args.interests.match(/\w+/g);
    interestSearch = interests.map((interest) => {
      return {
        interests: {
          $elemMatch: { $regex: ".*" + interest + ".*", $options: "i" },
        },
      };
    });
    andQuery.push({ $and: interestSearch });
  }

  teams = await Team.find({
    $and: [{ public: true }, ...andQuery],
  }).populate("members");

  teams.sort(function (a, b) {
    return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
  });

  return teams;
};

export default getTeams;
