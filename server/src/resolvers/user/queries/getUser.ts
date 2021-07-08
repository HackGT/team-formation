import { User } from "../../../models";
import { IUserMongoose } from "../../../types";
import { GraphQLError } from 'graphql';

const getUser = async function (
  parent,
  args,
  context,
  info,
  req
): Promise<IUserMongoose | null> {
  let user = await User.findById(args.user_id);
  if (!user) {
    throw new GraphQLError("User not found");
  }
  return user;
};

export default getUser;
