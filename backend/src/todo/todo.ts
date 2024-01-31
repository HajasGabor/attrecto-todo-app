import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: true })
  deadline: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
