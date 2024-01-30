import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import { CreateTodoDto } from './create-todo.dto'; // Import the CreateTodoDto class
import { UpdateTodoDto } from './update-todo.dto'; // Import the UpdateTodoDto class

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    async getAllTodos(): Promise<Todo[]> {
        return this.todoService.getAllTodos();
    }

    @Post()
    async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> { // Use CreateTodoDto as the parameter type
        const { title } = createTodoDto; // Extract the title property from the createTodoDto object
        const newTodoDto = new CreateTodoDto(); // Create a new instance of CreateTodoDto
        newTodoDto.title = title; // Assign the title property
        return this.todoService.createTodo(newTodoDto); // Pass the newTodoDto object as the argument
    }

    @Put(':id')
    async updateTodo(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTodoDto: UpdateTodoDto,
    ): Promise<Todo> {
        return this.todoService.updateTodo(id, updateTodoDto);
    }

    @Delete(':id')
    async deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.todoService.deleteTodo(id);
    }
}
