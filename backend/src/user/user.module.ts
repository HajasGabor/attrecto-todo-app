import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../todo/todo';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
