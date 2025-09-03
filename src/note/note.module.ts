import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from 'Schemas/note.schema';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])],
    exports: [MongooseModule],
    providers: [NoteService],
    controllers: [NoteController]
})

export class NoteModule {}
