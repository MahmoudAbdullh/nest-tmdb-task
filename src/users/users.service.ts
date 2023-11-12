import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userSchema: Model<User>) {}

  create(name: string, email: string, age: number): Promise<User> {
    const user = new this.userSchema({ name, email, age });
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userSchema.find().exec();
  }
}
