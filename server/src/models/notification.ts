import { model, Schema } from 'mongoose'
import { INotificationMongoose } from '../types'

const Notification = model<INotificationMongoose>("Notification", new Schema({
    message: String,
    bio: String,
    idea: String,
    senderType: {
        type: String,
        required: true,
        enum: ['Team', 'User']
    },
    receiverType: {
        type: String,
        required: true,
        enum: ['Team', 'User']
    },
    sender: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'senderType'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'receiverType'
    },
    resolved: Boolean
}));

export default Notification

