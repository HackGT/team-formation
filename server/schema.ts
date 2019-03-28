// The database schema used by Mongoose
// Exports TypeScript interfaces to be used for type checking and Mongoose models derived from these interfaces
import * as dotenv from "dotenv"
dotenv.config()

import * as mongoose from "mongoose";
const MONGO_URL = String(process.env.MONGO_URL);
mongoose.connect(MONGO_URL, {
    useMongoClient: false
}).catch(err => {
	throw err;
});
export {mongoose};
// We need to find some way of integrating these static types with a config that
// can be adapted with different questions and data in a JSON schema file
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
    secondary_email?: string;
    school?: string;
    grad_year?: string;
    skills?: string[];
    interests?: string[];
    beginner?: boolean;
    description?: string;
    image?: string;


}
export interface ITeam {
    uuid: string;
    creator: string;
	name: string;
	picture?: string;
    members: string[];
    interests?: string[];
    description?: string;
 
}

export type IUserMongoose = IUser & mongoose.Document;
export type ITeamMongoose = ITeam & mongoose.Document;
export const Team = mongoose.model<ITeamMongoose>("Team", new mongoose.Schema({
    creator: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String,
        unique: true
    },
    picture: String,
    members: {
        required: true,
        //Change type to mongo objectid?
        type: [String],
        unique: true
    },
    interests: [String],
    description: String
},{
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
    secondary_email: String,
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
    interests: [String],
    beginner: {
        type: Boolean,
        required: false
    },
    description: String,
    image: String,

	auth_keys: [String],

	admin: Boolean
},{
  usePushEach: true
    }));

