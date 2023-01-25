import { UserService } from './user.service';
import { Controller, UseGuards } from '@nestjs/common';
import { Get, Param, Delete } from '@nestjs/common/decorators';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { NotFoundException } from '@nestjs/common/exceptions';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getAll() {
    return this.userService.getAll()
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.getById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.userService.getById(id)))
      throw new NotFoundException('User not found');
    await this.userService.deleteById(id);
    return { success: true };
  }
} 
