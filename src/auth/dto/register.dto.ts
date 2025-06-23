import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  first_name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  last_name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(15)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}
