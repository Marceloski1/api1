import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsSemVer,
  IsString,
  MaxLength,
} from 'class-validator';
import { Muscle } from 'src/common/decorators/muscle.decorator';

export class CreateEjercicioInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(Muscle)
  @IsNotEmpty()
  muscle: Muscle;
}
