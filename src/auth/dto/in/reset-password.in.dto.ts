import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export default class ResetPasswordInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  resetToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[0-9])/, {
    message: 'password must contain at least one number.',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'password must contain at least one uppercase letter.',
  })
  newPassword: string;
}

//If you need special characters:
/*
  @Matches(/(?=.*\W)/, {
    message: 'password must contain at least one special character.',
  })
    */
