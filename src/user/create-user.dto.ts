
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(9)
  password: string;

  @IsNotEmpty()
  @MinLength(13)
  phone: string;
}