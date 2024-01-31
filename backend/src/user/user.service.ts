import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';
import { Todo } from '../todo/todo';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(userId: number): Promise<User | undefined> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { id: userId },
        relations: ['todos'],
      });
    } catch (error) {
      console.error('Error fetching user with todos:', error);
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  }

  async createUser(user: User): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new ConflictException(
        `User with email ${user.email} already exists`,
      );
    }

    return this.userRepository.save(user);
  }

  async updateUser(id: number, updatedUser: User): Promise<User> {
    await this.userRepository.update(id, updatedUser);
    return this.getUserById(id);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getUserById(id);
    if (user) {
      await this.userRepository.remove(user);
    }
    return user;
  }
}
