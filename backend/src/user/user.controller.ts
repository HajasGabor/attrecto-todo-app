import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user';
import { CreateUserDto } from './create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { error } from 'console';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('uploadProfilePicture/:id')
  @UseInterceptors(FileInterceptor('profilePicture'))
  async uploadProfilePicture(
    @Param('id') id: number,
    @UploadedFile() file,
    @Req() req,
  ): Promise<void> {
    console.log('File:', file);
    await this.userService.uploadProfilePicture(id, file);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserTodos(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user: User = {
      id: 0,
      todos: [],
      name: createUserDto.name,
      email: createUserDto.email,
    };
    return this.userService.createUser(user);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() updatedUser: User,
  ): Promise<User> {
    return this.userService.updateUser(id, updatedUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
