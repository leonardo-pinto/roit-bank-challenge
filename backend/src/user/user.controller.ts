import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ValidateNewUser } from './validations/validateNewUser';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Res() res: any) {
    const users = await this.userService.getAllUsers();

    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  // ADD VALIDATE PIPE!
  async getUserById(@Res() res: any, @Param('id') id: number) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new NotFoundException('User does not exist!');

    return res.status(HttpStatus.OK).json(user);
  }

  @Post()
  async createUser(
    @Res() res: any,
    @Body(ValidateNewUser) createUserDTO: CreateUserDTO,
  ) {
    const newUser = await this.userService.createUser(createUserDTO);

    return res.status(HttpStatus.CREATED).json(newUser);
  }

  @Put(':id')
  async updateUser(
    @Res() res: any,
    @Param('id') id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const updatedUser = await this.userService.updateUser(id, updateUserDTO);
    if (!updatedUser) throw new NotFoundException('User not found');

    return res.status(HttpStatus.OK).json(updateUserDTO);
  }

  @Delete(':id')
  async deleteUser(@Res() res: any, @Param('id') id: number) {
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) throw new NotFoundException('User not found');

    return res.status(HttpStatus.OK).json({ message: 'User has been deleted' });
  }
}
