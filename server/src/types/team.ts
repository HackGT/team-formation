import { RootDocument } from './mongoose'
import { Document } from 'mongoose'
import { IUser } from './user'

export interface ITeam extends RootDocument{
    uuid: string;
    creator: string;
    name: string;
    picture?: string;
    members: IUser[];
    interests?: string[];
    description?: string;
    project_idea?: string;
    public: boolean;
}

export type ITeamMongoose = ITeam & Document;
