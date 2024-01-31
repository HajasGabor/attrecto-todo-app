import { IsDate, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @Length(3, 50)
  title: string;

  @IsOptional()
  @IsDate()
  deadline?: Date;

  @IsNotEmpty()
  userId: number;
}
