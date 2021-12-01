import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { UserService } from '../user.service';

@Injectable()
export class ValidateNewUser implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(user: User) {
    const idExists = await this.userService.getUserById(user.id);
    if (idExists) throw new ConflictException('Id already exists');

    const nomeExists = await this.userService.getUserByName(user.nome);
    if (nomeExists) throw new ConflictException('Nome already exists');

    return user;
  }
}
