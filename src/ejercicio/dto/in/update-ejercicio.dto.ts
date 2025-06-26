import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Muscle } from 'src/common/decorators/muscle.decorator';

export class UpdateEjercicioInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsEnum(Muscle)
  @IsNotEmpty()
  muscle?: Muscle;
}
