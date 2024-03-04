import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from "../user/create-user.dto";
import { LoginUserDto } from '../user/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signUp(userDto: CreateUserDto): Promise<any> {
    const existingUser = await this.userService.findByEmail(userDto.email);
    if (existingUser) {
      throw new BadRequestException('There is already a user with this email');
    }

    const existingPhoneUser = await this.userService.findByPhone(userDto.phone);
    if (existingPhoneUser) {
        throw new BadRequestException('There is already a user with this phone number');
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 12);
    userDto.password = hashedPassword;

    const user = await this.userService.create(userDto);
    const { id, password, ...userWithoutSensitiveData } = user;

    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: userWithoutSensitiveData
    };
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
    const { id, password: passwordTwo, ...userWithoutSensitiveData } = user;

    return {
      access_token,
      user: userWithoutSensitiveData,
    };
  }
}