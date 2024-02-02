// update-todo.dto.ts
import { IsDate, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsDate()
  deadline?: Date;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
