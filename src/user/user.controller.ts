import { UserService } from './user.service';
import { Controller } from '@nestjs/common';
import { Get, Param } from '@nestjs/common/decorators';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { NotFoundException } from '@nestjs/common/exceptions';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getAll() {
    return this.userService.getAll()
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.getById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
} 
