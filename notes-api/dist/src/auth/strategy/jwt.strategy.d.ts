import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'Schemas/user.schema';
import { Model } from 'mongoose';
import { AuthUserDto } from 'src/auth/dtos';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private userModel;
    constructor(config: ConfigService, userModel: Model<User>);
    validate(payload: {
        userId: Object;
        email: string;
    }): Promise<AuthUserDto>;
}
export {};
