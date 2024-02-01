import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Todo } from '../todo/todo';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'bytea', nullable: true })
  profilePicture?: Buffer;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
