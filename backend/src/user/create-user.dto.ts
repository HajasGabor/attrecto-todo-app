import { IsNotEmpty, IsEmail } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Unique(['email'])
  @IsEmail()
  email: string;
}
