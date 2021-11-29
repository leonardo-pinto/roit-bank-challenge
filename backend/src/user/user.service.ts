import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = new this.userModel(createUserDTO);
    return newUser.save();
  }

  async updateUser(id: number, updateUserDTO: UpdateUserDTO): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDTO)
      .exec();
    return updatedUser;
  }

  async deleteUser(id: number): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(id);
    return deletedUser;
  }
}
