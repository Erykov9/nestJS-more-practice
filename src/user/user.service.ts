import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Password } from '@prisma/client';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}


  public getAll(): Promise<User[]> {
    return this.prismaService.user.findMany({ 
      include: { 
        password: true,
        books: {
          include: {
            book: true,
          }
        }
      }})
  };

  public getById(id: User['id']): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
      include: { password: true }
    });
  };

  public async getByEmail(email: User['email']): Promise<User & { password: Password } | null> {
    return await this.prismaService.user.findUnique({
      where: { email },
      include: { password: true }
    })
  };

  public async create(userData: Omit<User, 'id' | 'role'>, password: Password['hashedPassword']): Promise<User> {
    try {
      return await this.prismaService.user.create({
        data: {
          ...userData,
          password: {
            create: {
              hashedPassword: password,
            }
          }
        }
      })
    }catch (error) {
      if(error.code === 'P2002') {
        throw new ConflictException('This email already exists');
      }
    }
  }

  public async updateById(id: User['id'], userData: Omit<User, 'id' | 'role'>, password: string | undefined): Promise<User> {
    try {
      if(password !== undefined) {
        return await this.prismaService.user.update({
        where: { id },
        data: {
          ...userData,
          password: {
            update: {
              hashedPassword: password,
              }
            }
          }
        })
      } else if(password === undefined) {
        return await this.prismaService.user.update({
          where: { id },
          data: userData
        })
      }
    } catch (error) {
      if(error.code === 'P2002') {
        throw new ConflictException('This email already exists');
      }
    }
  }

  public deleteById(id: User['id']): Promise<User> {
    return this.prismaService.user.delete({
      where: { id }
    })
  }
}
