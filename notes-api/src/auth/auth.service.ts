import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
  Inject,
} from '@nestjs/common';
import { AuthLoginDto, AuthSignUpDto, AuthUserDto } from './dtos';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'Schemas/user.schema';
import { Model } from 'mongoose';
import { NOTIFICATION_SERVICE } from './rabbitConstants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(NOTIFICATION_SERVICE) private clientRmq: ClientProxy,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: AuthLoginDto) {

    const user = await this.userModel
      .findOne({ username: dto.username })
      .select('+hashPw');

    if (user) {
      const passwordCheck = await argon.verify(user.hashPw, dto.password);
      let lastLogin = new Date();
      await user.updateOne({ lastLogin: lastLogin });

      if (!passwordCheck) {
        throw new UnauthorizedException();
      } else {
        return this.signToken(user._id, user.email);
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  logout() {} // implementar fake? login

  async signup(dto: AuthSignUpDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = new this.userModel({
        username: dto.username,
        email: dto.email,
        hashPw: hash,
      });

      await user.save();
      await this.clientRmq.emit('user-created', user)
      return user;
    } catch (err) {
      console.error('Error creating user:', err);
      throw new ForbiddenException('Error while trying to create the user');
    }
  }

  async signToken(userId: Object, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const jwtKey = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: jwtKey,
    });

    return {
      access_token: token,
    };
  }
}
