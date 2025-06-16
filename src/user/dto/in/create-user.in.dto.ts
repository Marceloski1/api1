import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/rols.decorator';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @MinLength(5)
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty()
  @Matches(/^\d+$/, {
    message: 'phoneNumber must contain only digits.',
  })
  phone: string;

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
  password: string;

  @ApiProperty()
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
