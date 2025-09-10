import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from '../auth/guards';
import { GetUser } from '../auth/decorators';
import { User } from 'Schemas/user.schema';
import { UpdateUserDto } from './dto/index';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get-user')
  getUser(@GetUser('') user: User) {
    return user;
  }

  @Patch('update-user')
  updateUser(@GetUser('') user: User, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(user, dto);
  }
}
