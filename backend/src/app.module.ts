import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/todo';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { Repository } from 'typeorm';
import { User } from './user/user';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Todo],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Todo, User]),
    UserModule,
    TodoModule,
  ],
  controllers: [TodoController, UserController],
  providers: [TodoService, UserService],
})
export class AppModule {}
