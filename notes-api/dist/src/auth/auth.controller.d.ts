import { AuthService } from './auth.service';
import { AuthLoginDto, AuthSignUpDto } from './dtos';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: AuthLoginDto): Promise<{
        access_token: string;
    }>;
    logout(): string;
    signup(dto: AuthSignUpDto): Promise<import("mongoose").Document<unknown, {}, import("../../Schemas/user.schema").User, {}, {}> & import("../../Schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
