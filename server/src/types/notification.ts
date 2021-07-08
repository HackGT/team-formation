import { RootDocument } from './mongoose'
import { Document } from 'mongoose'
import { IUser } from './user'
import { ITeam } from './team'

export interface INotification extends RootDocument {
    message: string;
    bio: string;
    idea: string;
    notificationType: string;
    sender: IUser & ITeam;
    senderType: string;
    receiverType: string;
    receiver: IUser & ITeam;
    resolved: boolean;

}

export type INotificationMongoose = (INotification & Document);

