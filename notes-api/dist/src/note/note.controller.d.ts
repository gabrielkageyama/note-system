import { NoteService } from './note.service';
import { User } from 'Schemas/user.schema';
import { NoteDto, UpdateNoteDto } from './dto';
export declare class NoteController {
    private noteService;
    constructor(noteService: NoteService);
    getUserNotes(user: User): Promise<{}>;
    getNote(user: User, noteId: Object): Promise<(import("mongoose").Document<unknown, {}, import("../../Schemas/note.schema").Note, {}, {}> & import("../../Schemas/note.schema").Note & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    createNote(user: User, dto: NoteDto): Promise<import("mongoose").Document<unknown, {}, import("../../Schemas/note.schema").Note, {}, {}> & import("../../Schemas/note.schema").Note & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateNote(user: User, dto: UpdateNoteDto, noteId: Object): Promise<(import("mongoose").Document<unknown, {}, import("../../Schemas/note.schema").Note, {}, {}> & import("../../Schemas/note.schema").Note & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteNote(user: User, noteId: Object): Promise<void>;
}
