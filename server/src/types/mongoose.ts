import { Model, Document, Types } from 'mongoose'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface RootDocument {
    _id: Types.ObjectId;
}
export function createNew<T extends RootDocument>(model: Model<T & Document, {}>, doc: Omit<T, "_id">) {
    return new model(doc);
}