import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { User } from "Schemas/user.schema"

export class NoteDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    content?: string
}

export class UpdateNoteDto {
    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    content?: string
}