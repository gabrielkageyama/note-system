import { User } from 'Schemas/user.schema';
import { UpdateUserDto } from './dto/index';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(user: User): User;
    updateUser(user: User, dto: UpdateUserDto): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
