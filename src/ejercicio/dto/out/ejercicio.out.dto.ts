import { ApiProperty } from '@nestjs/swagger';
import { Muscle } from 'src/common/decorators/muscle.decorator';

export default class EjercicioOutDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  muscle: Muscle;
}
