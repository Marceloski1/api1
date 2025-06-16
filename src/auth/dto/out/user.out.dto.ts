import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/rols.decorator';

export default class UserOutDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  isActive: boolean;
}
