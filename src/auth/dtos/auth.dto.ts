import { IsArray, IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator"
import { Note } from "Schemas/note.schema"

export class AuthSignUpDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class AuthLoginDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class AuthUserDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @IsString()
  email: string

  @IsArray()
  notes: Note[]

  @IsDate()
  lastLogin: Date
}
