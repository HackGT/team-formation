import { User } from "../../../models";
import { IUserMongoose } from "../../../types";

const updateUser = async function (
  parent,
  args,
  context,
  info,
  req
): Promise<IUserMongoose | null> {
  return await User.findByIdAndUpdate(
    context._id,
    { $set: args },
    { new: true }
  );
};

export default updateUser;
