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
    const users = await this.userModel.find();
    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userModel.findOne({ id });
    return user;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = new this.userModel(createUserDTO);
    return newUser.save();
  }

  async updateUser(id: number, updateUserDTO: UpdateUserDTO): Promise<User> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { id },
      updateUserDTO,
    );
    return updatedUser;
  }

  async deleteUser(id: number): Promise<any> {
    const deletedUser = await this.userModel.findOneAndRemove({ id });
    return deletedUser;
  }

  async getUserByName(nome: string): Promise<User> {
    const user = await this.userModel.findOne({ nome });
    return user;
  }
}
