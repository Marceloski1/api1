import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/in/create-user.in.dto';
import { UpdateUserDto } from './dto/in/update-user.in.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiResponseProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role, Rols } from 'src/common/decorators/rols.decorator';
import User from './entities/user.entity';
import PaginatedOutDto from 'src/common/dto/pagination/paginated.out.dto';
import UserOutDto from './dto/out/user.out.dto';
import UserSearchInDto from './dto/in/user.search.in.dto';

@Controller('v1/users')
@ApiTags('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @Rols(Role.USER, Role.TRAINER, Role.TRAINER)
  @ApiResponse({ description: 'Ok', type: [User] })
  @ApiOperation({ summary: 'Get all Users' })
  async getAll() {
    return this.userService.getAll();
  }

  @Get('/search')
  @Rols(Role.ADMIN)
  @ApiOkResponse({ description: 'Ok', type: UserOutDto })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({ summary: 'Get User by its id' })
  async get(
    @Query() dto: UserSearchInDto,
  ): Promise<PaginatedOutDto<UserOutDto>> {
    return this.userService.search(dto);
  }

  @Get('/:id')
  @Rols(Role.ADMIN)
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiOkResponse({ description: 'Ok', type: UserOutDto })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  @Post('')
  @ApiCreatedResponse({ description: 'Ok', type: UserOutDto })
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiConflictResponse({
    description: 'Conflict (Other user with name or Email)',
  })
  @ApiOperation({ summary: 'Create a new user if does not exist' })
  async post(@Body() dto: CreateUserDto) {
    return this.userService.post(dto);
  }

  @Patch('/:id')
  @Rols(Role.ADMIN)
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiConflictResponse({
    description: 'Conflic (other user with name or email',
  })
  @ApiOperation({ summary: 'Update a user by its id' })
  async put(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete('/:id')
  @Rols(Role.ADMIN)
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({
    description: 'Conflict (Current user cannot be deleted)',
  })
  @ApiOperation({ summary: 'Delete user by id' })
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const name = req.user.name;
    return this.userService.delete(id, name);
  }
}
