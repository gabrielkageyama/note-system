import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
    @Inject(NOTIFICATION_SERVICE) private rmqClient: ClientProxy,
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
    const noteCreator = await this.userModel.findOne({
      username: user.username,
    });

    if (!noteCreator) {
      throw new ForbiddenException('Unable to create note');
    }

    const note = new this.noteModel({
      ...dto,
      noteCreator: user,
    });

    await note.save();
    this.rmqClient.emit('note-created', note)

    noteCreator.notes.push(note);
    await noteCreator.save();

    await this.cacheManager.del('notes');
    return note;
  }

  async updateNote(user: User, dto: UpdateNoteDto, noteId: Object) {
    const updatedNote = await this.noteModel.findByIdAndUpdate(noteId, {
      ...dto,
    });

    await this.cacheManager.del('notes');
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
