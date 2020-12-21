import {
  acceptTeamRequest,
  makeTeamRequest,
  acceptUserRequest,
  makeUserRequest,
} from "./mutations";

import { getTeamNotifications, getUserNotifications } from "./queries";

const resolvers = {
  Query: {
    team_notifications: getTeamNotifications,
    notifications: getUserNotifications,
  },
  Mutation: {
    accept_user_request: acceptUserRequest,
    accept_team_request: acceptTeamRequest,
    make_team_request: makeTeamRequest,
    make_user_request: makeUserRequest,
  }
};

export default resolvers;
