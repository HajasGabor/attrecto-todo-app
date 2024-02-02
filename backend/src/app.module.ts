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
import { RegisteredUser } from './registered-user/registered-user';
import { User } from './user/user';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { RegisteredUserController } from './registered-user/registered-user.controller';
import { RegisteredUserService } from './registered-user/registered-user.service';
import { RegisteredUserModule } from './registered-user/registered-user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'postgres',
      entities: [User, Todo],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Todo, User, RegisteredUser]),
    UserModule,
    TodoModule,
    RegisteredUserModule,
  ],
  controllers: [TodoController, UserController, RegisteredUserController],
  providers: [TodoService, UserService, RegisteredUserService],
})
export class AppModule {}
