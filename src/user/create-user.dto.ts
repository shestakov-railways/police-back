import { IsEmail, IsNotEmpty, MinLength, Validate, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsUkrainianPhone', async: false })
export class IsUkrainianPhone implements ValidatorConstraintInterface {
  validate(phone: string) {
    const ukrainianPhoneRegex = /^\+?38(0\d{9})$/;

    return ukrainianPhoneRegex.test(phone);
  }

  defaultMessage() {
    return 'phone must be a valid Ukrainian phone number';
  }
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(9)
  password: string;

  @IsNotEmpty()
  @MinLength(13)
  @Validate(IsUkrainianPhone)
  phone: string;
}