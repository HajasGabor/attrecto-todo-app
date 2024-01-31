import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user';
import { CreateUserDto } from './create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserTodos(@Param('id') id: string): Promise<User> {
    const userId = parseInt(id, 10);
    return this.userService.getUserById(userId);
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
    @Param('id') id: string,
    @Body() updatedUser: User,
  ): Promise<User> {
    return this.userService.updateUser(parseInt(id, 10), updatedUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(parseInt(id, 10));
  }
}
