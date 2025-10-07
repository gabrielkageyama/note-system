import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectModel, IsObjectIdPipe, ParseObjectIdPipe } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from 'Schemas/note.schema';
import { User } from 'Schemas/user.schema';
import { NoteDto, UpdateNoteDto } from './dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from './rabbitConstant';

@Injectable()
export class NoteService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(NOTIFICATION_SERVICE) private clientRMQ: ClientProxy,
    @InjectModel(Note.name) private noteModel: Model<Note>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getNote(user: User, noteId: Object) {
    return this.noteModel.findById(noteId);
  }

  async getUserNotes(user: User) {
    const cachedNotes = await this.cacheManager.get('notes');

    if (!cachedNotes) {
      const cachedNotes = await this.cacheManager.set('notes', {
        notes: user.notes,
      });
      return cachedNotes;
    }

    return cachedNotes;
  }

  async createNote(user: User, dto: NoteDto) {
    

    const note = new this.noteModel({
      ...dto,
      noteCreator: user,
    });

    await note.save();

    user.notes.push(note);
    await this.userModel.findOneAndUpdate({ username: user.username}, { notes: user.notes } );

    await this.cacheManager.del('notes');
    this.clientRMQ.emit('note-created', [note, user]);
    return note;
  }

  async updateNote(user: User, dto: UpdateNoteDto, noteId: Object) {
    const note = await this.noteModel.findById(noteId);
    
    if (!note || note.noteCreator.username != user.username) {
      //should be better to work with the user id, but because username is also unique i will mantain like this for now
      throw new ForbiddenException('Unable to find note');
    }
    
    const updatedNote = await this.noteModel.findByIdAndUpdate(noteId, {
      ...dto,
    });

    await this.cacheManager.del('notes');
    this.clientRMQ.emit('note-updated', [updatedNote, user, dto])
    return updatedNote;
  }

  async deleteNote(user: User, noteId: Object) {
    const note = await this.noteModel.findById(noteId);

    if (!note || note.noteCreator.username != user.username) {
      //should be better to work with the user id, but because username is also unique i will mantain like this for now
      throw new ForbiddenException('Unable to delete desired information');
    }

    await this.cacheManager.del('notes');
    await note.deleteOne(noteId);
  }
}
