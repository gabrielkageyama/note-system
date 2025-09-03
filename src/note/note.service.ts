import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Note } from "Schemas/note.schema";
import { User } from "Schemas/user.schema";
import { NoteDto, UpdateNoteDto } from "./dto";

@Injectable()
export class NoteService {
    constructor(@InjectModel(Note.name) private noteModel: Model<Note>) { }

    async getNote(user: User, noteId: Object) {
        return this.noteModel.findById(noteId);
    }

    async getUserNotes(user: User) {
        return user.notes;
    }

    async createNote(user: User, dto: NoteDto) {
        const note = new this.noteModel ({
            ...dto,
            noteCreator: user
        });
        await note.save();
        return note;
    }

    async updateNote(user: User, dto: UpdateNoteDto, noteId: Object) {
        const updatedNote = await this.noteModel.findByIdAndUpdate(noteId, {...dto });

        return updatedNote;
    }


    async deleteNote(user: User, noteId: Object) {
        const note = await this.noteModel.findById(noteId);

        if(!note || note.noteCreator != user ){
            throw new ForbiddenException (
                'Unable to delete desired information'
            );
        }

        note.deleteOne(noteId);

        return 'Deletion completed';
    }
}