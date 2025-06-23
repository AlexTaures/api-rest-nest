import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class AuthService {
  async register(registerDto: RegisterDto) {
    try {
      const { first_name, last_name, username, email, password } = registerDto;
      const user = new User();
      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      user.password = password;
      user.username = username;

      await this.usersService.create(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user.email };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      email: user.email,
    };
  }
}
