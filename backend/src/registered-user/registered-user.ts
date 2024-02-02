import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('registered_user')
export class RegisteredUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
