import { Injectable } from '@nestjs/common';
import { AuthDto } from './dtos';
import * as argon from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'Schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  login(dto: AuthDto) {


    return 'You have logged in';
  }

  logout() { }

  async signup(dto: AuthDto): Promise<AuthDto> {
    const hash = await argon.hash(dto.password);

    const user = new this.userModel({
      username: dto.username,
      email: dto.email,
      hashPw: hash,
    })

    user.save();

    return user;
  }

}
