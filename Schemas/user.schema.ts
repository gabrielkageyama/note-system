import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  ername: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, unique: true })
  passssword: string;
  @Prop({ type: Date, default: Date.now })
  lastLogin: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
