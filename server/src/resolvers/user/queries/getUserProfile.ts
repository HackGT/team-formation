import { User } from "../../../models";
import { IUserMongoose } from "../../../types";

const getUserProfile = async function (
  parent,
  args,
  context,
  info,
  req
): Promise<IUserMongoose | null> {
    return await User.findById(context._id).populate("team");
};

export default getUserProfile;
