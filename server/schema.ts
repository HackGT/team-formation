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
	email: string;
	name: string;

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
    interests?: string[];
    beginner?: boolean;
    description?: string;
    image?: string;

}
export interface ITeam {
	name: string;
	picture?: string;
    members: string[];
    interests?: string[];
    description?: string;

}
export type IUserMongoose = IUser & mongoose.Document;
export type ITeamMongoose = ITeam & mongoose.Document;
export const Team = mongoose.model<ITeamMongoose>("Team", new mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    picture: String,
    members: {
        required: true,
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
    name: {
        type: String,
        required: false
    },
    school: {
        type: String,
        required: false
    },
    grad_year: String,
    skills: [String],
    interests: [String],
    beginner: {
        type: Boolean,
        required: false
    },
    description: String,
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
