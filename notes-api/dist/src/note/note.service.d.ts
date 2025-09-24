import { Model } from 'mongoose';
import { Note } from 'Schemas/note.schema';
import { User } from 'Schemas/user.schema';
import { NoteDto, UpdateNoteDto } from './dto';
import type { Cache } from 'cache-manager';
import { ClientProxy } from '@nestjs/microservices';
export declare class NoteService {
    private cacheManager;
    private clientRMQ;
    private noteModel;
    private userModel;
    constructor(cacheManager: Cache, clientRMQ: ClientProxy, noteModel: Model<Note>, userModel: Model<User>);
    getNote(user: User, noteId: Object): Promise<(import("mongoose").Document<unknown, {}, Note, {}, {}> & Note & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getUserNotes(user: User): Promise<{}>;
    createNote(user: User, dto: NoteDto): Promise<import("mongoose").Document<unknown, {}, Note, {}, {}> & Note & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateNote(user: User, dto: UpdateNoteDto, noteId: Object): Promise<(import("mongoose").Document<unknown, {}, Note, {}, {}> & Note & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteNote(user: User, noteId: Object): Promise<void>;
}
