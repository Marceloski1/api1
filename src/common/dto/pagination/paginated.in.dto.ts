import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmpty,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export default class PaginatedInDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page: number = 1;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  pageSize: number = 10;

  @ApiProperty({ example: 'id', required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  orderBy: string = 'id';

  @ApiProperty({
    enum: OrderDirection,
    example: OrderDirection.ASC,
    required: false,
  })
  @IsOptional()
  @IsEmpty()
  @IsEnum(OrderDirection)
  orderDirection: OrderDirection = OrderDirection.ASC;
}
