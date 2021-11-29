import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ValidateNewUser } from './validations/validateNewUser';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();

    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new NotFoundException('User does not exist!');

    return user;
  }

  @Post()
  async createUser(@Body(ValidateNewUser) createUserDTO: CreateUserDTO) {
    const newUser = await this.userService.createUser(createUserDTO);

    return newUser;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const updatedUser = await this.userService.updateUser(id, updateUserDTO);
    if (!updatedUser) throw new NotFoundException('User not found');
    return { message: 'User has been updated' };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) throw new NotFoundException('User not found');

    return { message: 'User has been deleted' };
  }
}
