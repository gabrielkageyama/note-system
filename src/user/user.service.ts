import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/index';
import { User } from 'Schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async updateUser( user: User, dto: UpdateUserDto ) {
    
    const updatedUser = await this.userModel.findOneAndUpdate( { username: user.username }, { ...dto } );

    return updatedUser;
  }
}
