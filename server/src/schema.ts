import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config()

const MONGO_URL = String(process.env.MONGO_URL);
mongoose.connect(MONGO_URL, {
    useMongoClient: false
}).catch(err => {
    throw err;
});
export {mongoose};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
interface RootDocument {
    _id: mongoose.Types.ObjectId;
}
export function createNew<T extends RootDocument>(model: mongoose.Model<T & mongoose.Document, {}>, doc: Omit<T, "_id">) {
    return new model(doc);
}

export interface IUser extends RootDocument {
    uuid: string;
    email: string;
    name: string;
    token: string | null;
    admin?: boolean;
    school?: string;
    grad_year?: string;
    skills?: string[];
    beginner?: boolean;
    experience?: string;
    contact?: string;
    image?: string;
    contact_method?: string;
    visible?: number;
    team?: ITeam;
}

export interface INotification extends RootDocument {
    message: string;
    notificationType: string;
    sender: IUser | ITeam;
    receiver: IUser | ITeam;
    accepted: boolean;
}

export interface ITeam {
    uuid: string;
    creator: string;
    name: string;
    picture?: string;
    members: IUser[];
    interests?: string[];
    description?: string;
    public: boolean;
}

export type IUserMongoose = IUser & mongoose.Document;
export type ITeamMongoose = ITeam & mongoose.Document;
export type INotificationMongoose = INotification & mongoose.Document;
export const Notification = mongoose.model<INotificationMongoose>("Notification", new mongoose.Schema({
    message: String,
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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'senderType'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'receiverType'
    }
}))
export const Team = mongoose.model<ITeamMongoose>("Team", new mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    picture: String,
    members: {
        required: true,
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        unique: true
    },
    interests: [String],
    description: String,
    public: Boolean
    },
    {
        usePushEach: true
    }));

export const User = mongoose.model<IUserMongoose>("User", new mongoose.Schema({
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        }
    },
    {
        usePushEach: true
    }));
