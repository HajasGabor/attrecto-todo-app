import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { RegisteredUserDto } from './registered-user.dto';
import { RegisteredUserService } from './registered-user.service';
import { RegisteredUser } from './registered-user';
import { LoginDto } from './login.dto';

@Controller()
export class RegisteredUserController {
  constructor(private readonly registeredUserService: RegisteredUserService) {}

  @Post('register')
  async registerUser(
    @Body() userDto: RegisteredUserDto,
  ): Promise<RegisteredUser> {
    return await this.registeredUserService.registerUser(userDto);
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto): Promise<RegisteredUser> {
    const user = await this.registeredUserService.loginUser(loginDto);

    return user;
  }
}
