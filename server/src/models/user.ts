import { model, Schema } from 'mongoose'
import { IUserMongoose } from '../types'

const UserSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    school: {
        type: String,
        required: false
    },
    token: String,
    grad_year: String,
    skills: [String],
    beginner: {
        type: Boolean,
        required: false
    },
    experience: String,
    image: String,
    auth_keys: [String],
    admin: Boolean,
    contact: String,
    contact_method: String,
    visible: Number,
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team"
    },
    slackid: String
});

UserSchema.index({
  name: 'text',
  school: 'text',
  grad_year: 'text',
  skills: 'text',
  experience: 'text'
});

const User = model<IUserMongoose>("User", UserSchema);

export default User