import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'Schemas/user.schema'


export type NoteDocument = HydratedDocument<Note>;

@Schema({ timestamps: true })
export class Note{
  @Prop({ required:true })
  content: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  noteCreator: User;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
