import { ForbiddenException, HttpCode, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Note } from "Schemas/note.schema";
import { User } from "Schemas/user.schema";
import { NoteDto, UpdateNoteDto } from "./dto";

@Injectable()
export class NoteService {
    constructor(@InjectModel(Note.name) private noteModel: Model<Note>,
                @InjectModel(User.name) private userModel: Model<User>) { }

    async getNote(user: User, noteId: Object) {
        return this.noteModel.findById(noteId);
    }

    async getUserNotes(user: User) {
        return user.notes;
    }

    async createNote(user: User, dto: NoteDto) {
        const noteCreator = await this.userModel.findOne({ username: user.username }).select('+hashPw');

        if(!noteCreator){
            throw new ForbiddenException(
                'Unable to create note'
            )
        }
        
        const note = new this.noteModel ({
            ...dto,
            noteCreator: noteCreator._id
        });
        await note.save();
        noteCreator.notes.push(note);
        await noteCreator.save();

        return note;
    }

    async updateNote(user: User, dto: UpdateNoteDto, noteId: Object) {
        const updatedNote = await this.noteModel.findByIdAndUpdate(noteId, {...dto });

        return updatedNote;
    }


    async deleteNote(user: User, noteId: Object) {
        const note = await this.noteModel.findById(noteId);
        

        if(!note || note.noteCreator.username != user.username ){ //should be better work with the user id, but because username is also unique i will mantain like this for now
            throw new ForbiddenException (
                'Unable to delete desired information'
            );
        }

        await note.deleteOne(noteId);
    }
}