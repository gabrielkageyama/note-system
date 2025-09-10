import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'Schemas/user.schema';
import { Model } from 'mongoose';
import { AuthUserDto } from 'src/auth/dtos';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: {
    userId: Object;
    email: string;
  }): Promise<AuthUserDto> {
    const user = await this.userModel.findOne(payload.userId);

    if (!user) {
      throw new ForbiddenException('Validation failed');
    }

    return user;
  }
}
