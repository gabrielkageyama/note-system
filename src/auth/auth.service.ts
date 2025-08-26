import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthLoginDto, AuthSignUpDto, AuthUserDto } from './dtos';
import * as argon from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'Schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async login(dto: AuthLoginDto) {
    const query = this.userModel.where({ username: dto.username });
    const user = await query.findOne().select('+hashPw');

    if (!user)
      throw new ForbiddenException(
        'Wrong Credentials'
      );

    const passwordCheck = await argon.verify(user.hashPw, dto.password);

    if (!passwordCheck)
      throw new ForbiddenException(
        'Wrong Credentials'
      )

    const safeUser: AuthUserDto = {
      username: user.username,
      email: user.email,
      notes: user.notes,
      lastLogin: user.lastLogin,
    };

    return safeUser;

  }

  logout() { }

  async signup(dto: AuthSignUpDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = new this.userModel({
        username: dto.username,
        email: dto.email,
        hashPw: hash,
      })

      await user.save();
      return user;

    } catch (err) {
      console.error('Error creating user:', err);
      throw new ForbiddenException(
        'Error while trying to create the user'
      )
    }

  }

}
