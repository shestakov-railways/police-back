import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateUserDto } from '../user/create-user.dto';
import { LoginUserDto } from '../user/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/sign-up')
    async signUp(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        return this.authService.signUp(createUserDto);
    }

    @Post('/sign-in')
    async signIn(@Body() loginUserDto: LoginUserDto) {
        return this.authService.signIn(loginUserDto);
    }
}
