import { Note } from 'Schemas/note.schema';
export declare class AuthSignUpDto {
    username: string;
    email: string;
    password: string;
}
export declare class AuthLoginDto {
    username: string;
    password: string;
}
export declare class AuthUserDto {
    username: string;
    email: string;
    notes: Note[];
    lastLogin: Date;
}
