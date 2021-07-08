import { model, Schema } from 'mongoose'
import { ITeamMongoose } from '../types'

const TeamSchema = new Schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    picture: String,
    members: {
        required: true,
        type: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    interests: [String],
    description: String,
    project_idea: String,
    notifications: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Notification"
        }]
    },
    public: Boolean
    },
    {
        usePushEach: true
    }
);

TeamSchema.index({
    name: 'text',
    members: 'text',
    interests: 'text',
    description: 'text'
})

const Team = model<ITeamMongoose>("Team", TeamSchema);

export default Team