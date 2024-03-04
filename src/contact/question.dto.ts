
import { IsEmail, IsNotEmpty } from 'class-validator';

export class Question {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  text: string;
}