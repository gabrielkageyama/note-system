import { HydratedDocument } from "mongoose";
import { Note } from './note.schema';
import * as mongoose from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    username: string;
    email: string;
    hashPw: string;
    lastLogin: Date;
    notes: Note[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User, any, {}> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
