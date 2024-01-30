// update-todo.dto.ts
import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  title: string;


  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
