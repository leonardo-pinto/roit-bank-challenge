import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { UserService } from '../user.service';

@Injectable()
export class ValidateFields implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(user: User) {
    const { id, nome, idade } = user;

    if (!id || !nome || !idade) {
      throw new BadRequestException('All fields are required');
    }

    return user;
  }
}
