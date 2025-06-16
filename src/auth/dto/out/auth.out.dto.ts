import { ApiProperty } from '@nestjs/swagger';

export default class AuthOutDto {
  @ApiProperty()
  accessTokem: string;

  @ApiProperty()
  refreshToken: string;
}
