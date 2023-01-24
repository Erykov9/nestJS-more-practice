import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { BooksUpdateDTO } from './dtos/books-update.dto';
import { BooksCreateDTO } from './dtos/books-create.dto';
import { BooksService } from './books.service';
import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';



@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('/')
  getAll() {
    return this.booksService.getAll()
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const author = await this.booksService.getById(id);
    if (!author) throw new NotFoundException('Book not found');
    return author;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  create(@Body() bookData: BooksCreateDTO) {
    return this.booksService.create(bookData);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() bookData: BooksUpdateDTO) {
    if (!(await this.booksService.getById(id)))
    throw new NotFoundException('Book not found');

    await this.booksService.updateById(id, bookData);
    return { success: true };
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.booksService.getById(id)))
      throw new NotFoundException('Book not found');
    await this.booksService.deleteById(id);
    return { success: true };
  }
}
