import { updateTeam, leaveTeam } from './mutations'
import { getTeam, getTeams } from './queries';

const resolvers = {
    Query: {
        teams: getTeams,
        team: getTeam
      },
      Mutation: {
        update_team: updateTeam,
        leave_team: leaveTeam
      }
}

export default resolvers