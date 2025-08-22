import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";
import { Note } from './note.schema';
import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  hashPw: string;

  @Prop({ type: Date, default: Date.now })
  lastLogin: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }] })
  notes: Note[];
}

export const UserSchema = SchemaFactory.createForClass(User);




