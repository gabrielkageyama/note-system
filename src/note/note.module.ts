import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from 'Schemas/note.schema';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { User, UserSchema } from 'Schemas/user.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema}]),
              MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])],
    exports: [MongooseModule],
    providers: [NoteService],
    controllers: [NoteController]
})

export class NoteModule {}
