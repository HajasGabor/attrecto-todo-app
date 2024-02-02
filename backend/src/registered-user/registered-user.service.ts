import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisteredUser } from './registered-user';
import { RegisteredUserDto } from './registered-user.dto';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisteredUserService {
  constructor(
    @InjectRepository(RegisteredUser)
    private readonly registeredUserRepository: Repository<RegisteredUser>,
  ) {}

  async registerUser(userDto: RegisteredUserDto): Promise<RegisteredUser> {
    const { username, email, password } = userDto;

    const existingUser = await this.registeredUserRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ConflictException('Username or email is already taken.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.registeredUserRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return await this.registeredUserRepository.save(newUser);
  }

  async loginUser(loginDto: LoginDto): Promise<RegisteredUser> {
    const { username, password } = loginDto;

    const user = await this.registeredUserRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }
}
