import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async createTodo(createTodoDto: CreateTodoDto) {
    if (!createTodoDto.title || createTodoDto.title.trim() === '') {
        throw new BadRequestException('Title is required');
    }


    const todo = this.todoRepository.create({ title: createTodoDto.title });
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
