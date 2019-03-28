// The database schema used by Mongoose
// Exports TypeScript interfaces to be used for type checking and Mongoose models derived from these interfaces
import * as fs from "fs";
import * as path from "path";

import * as mongoose from "mongoose";
import * as ajv from "ajv";
import * as passport from "passport";

// We need to find some way of integrating these static types with a config that
// can be adapted with different questions and data in a JSON schema file
export interface IUser {
    _id: mongoose.Types.ObjectId;
	email: string;
	first_name: string;
    last_name: string;
	login: {
		hash: string;
		salt: string;
	};
	auth_keys: string[];
    admin?: boolean;
    secondary_email?: string;
    school?: string;
    grad_year?: string;
    skills?: string[];
    beginner?: boolean;
    experience?: string;
    contact?: string;
    image?: string;
}
export interface ITeam {
    _id: mongoose.Types.ObjectId;
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

    email: {
		type: String,
		required: true,
		unique: true
	},
    secondary_email: String,
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    school: {
        type: String,
        required: false
    },
    grad_year: String,
    skills: [String],
    beginner: {
        type: Boolean,
        required: false
    },
    experience: String,
    contact: String,
    image: String,
	login: {
		hash: {
			type: String,
			required: true,
		},
		salt: {
			type: String,
			required: true,
		}
	},
	auth_keys: [String],
	admin: Boolean
},{
  usePushEach: true
}));
