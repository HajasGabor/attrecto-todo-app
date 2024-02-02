import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';
import { NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private readonly userService: UserService,
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async createTodoForUser(
    userId: number,
    createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const todo = this.todoRepository.create({
      ...createTodoDto,
      user,
    });

    return this.todoRepository.save(todo);
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    if (updateTodoDto.completed !== undefined) {
      todo.completed = updateTodoDto.completed;
    }

    if (updateTodoDto.title !== undefined) {
      todo.title = updateTodoDto.title;
    }

    if (updateTodoDto.deadline !== undefined) {
      todo.deadline = updateTodoDto.deadline;
    }

    return this.todoRepository.save(todo);
  }

  async deleteTodo(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    await this.todoRepository.remove(todo);
  }
}
