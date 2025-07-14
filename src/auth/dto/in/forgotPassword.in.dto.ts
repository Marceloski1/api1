import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class ForgotPasswordInDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
