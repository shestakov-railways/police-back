import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from "../user/create-user.dto";
import { LoginUserDto } from '../user/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signUp(userDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(userDto.password, 12);
    userDto.password = hashedPassword;

    const user = await this.userService.create(userDto);

    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async signIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException({ error: true, message: 'User not found' });
    }
  
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException({ error: true, message: 'Incorrect password' });
    }
  
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    
    return {
      access_token,
    };
  }
}