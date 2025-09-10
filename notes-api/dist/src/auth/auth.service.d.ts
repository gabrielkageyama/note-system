import { AuthLoginDto, AuthSignUpDto } from './dtos';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'Schemas/user.schema';
import { Model } from 'mongoose';
export declare class AuthService {
    private userModel;
    private jwt;
    private config;
    constructor(userModel: Model<User>, jwt: JwtService, config: ConfigService);
    login(dto: AuthLoginDto): Promise<{
        access_token: string;
    }>;
    logout(): void;
    signup(dto: AuthSignUpDto): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    signToken(userId: Object, email: string): Promise<{
        access_token: string;
    }>;
}
