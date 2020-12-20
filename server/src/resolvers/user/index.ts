import { updateUser } from './mutations'
import { getUser, getUserProfile, getUsers } from './queries';

const resolvers = {
    Query: {
        users: getUsers,
        user_profile: getUserProfile,
        user: getUser,
      },
      Mutation: {
        update_user: updateUser,
      }
}

export default resolvers