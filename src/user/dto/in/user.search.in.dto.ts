import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/common/decorators/rols.decorator';
import PaginatedInDto from 'src/common/dto/pagination/paginated.in.dto';

export default class UserSearchInDto extends PaginatedInDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isActice?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Role)
  role?: Role;
}
