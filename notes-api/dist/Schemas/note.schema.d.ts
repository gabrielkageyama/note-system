import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'Schemas/user.schema';
export type NoteDocument = HydratedDocument<Note>;
export declare class Note {
    title: string;
    content: string;
    noteCreator: User;
}
export declare const NoteSchema: mongoose.Schema<Note, mongoose.Model<Note, any, any, any, mongoose.Document<unknown, any, Note, any, {}> & Note & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Note, mongoose.Document<unknown, {}, mongoose.FlatRecord<Note>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Note> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
