import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { NotFoundException } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateAuthorsDTO } from './dtos/authors-create.dto';
import { UpdateAuthorsDTO } from './dtos/authors-update.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get('/')
  getAll() {
    return this.authorsService.getAll()
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const author = await this.authorsService.getById(id);
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  create(@Body() authorData: CreateAuthorsDTO) {
    return this.authorsService.create(authorData);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() authorData: UpdateAuthorsDTO) {
    if (!(await this.authorsService.getById(id)))
    throw new NotFoundException('Author not found');

    await this.authorsService.updateById(id, authorData);
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.authorsService.getById(id)))
      throw new NotFoundException('Author not found');
    await this.authorsService.deleteById(id);
    return { success: true };
  }
}
