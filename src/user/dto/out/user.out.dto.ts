import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/rols.decorator';

export default class UsersOutDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  phone: string;
}
