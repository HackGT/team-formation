import { RootDocument } from './mongoose'
import { Document } from 'mongoose'
import { ITeam } from './team'

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
    slackid: string;
}

export type IUserMongoose = (IUser & Document);

