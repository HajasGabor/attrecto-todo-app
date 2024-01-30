import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/todo';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
        type: "postgres",
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: ["dist/**/*{.ts,.js}"],
        synchronize: true,
      }), 
      TypeOrmModule.forFeature([Todo]),
    ],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService],
})
export class AppModule {}
