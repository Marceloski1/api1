import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Request,
  UseFilters,
  ForbiddenException,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { EjercicioService } from './ejercicio.service';

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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role, Rols } from 'src/common/decorators/rols.decorator';
import { CreateEjercicioInDto } from './dto/in/create-ejercicio.dto';
import EjercicioOutDto from './dto/out/ejercicio.out.dto';
import { UpdateEjercicioInDto } from './dto/in/update-ejercicio.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http.exception.filter';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { createEjercicioInSchema } from './schemas/create-ejercicio.schema';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

@ApiBearerAuth()
@ApiTags('v1/ejercicio')
//@UseGuards(RolesGuard)
//@UseFilters(new HttpExceptionFilter())
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unautorized' })
@Controller('v1/ejercicio')
export class EjercicioController {
  constructor(private readonly ejercicioService: EjercicioService) {}

  @Post('')
  @ApiOperation({ summary: 'Create one ejercicio' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiForbiddenResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiCreatedResponse({ description: 'Ok', type: EjercicioOutDto })
  @ApiConflictResponse({
    description: 'Conflict (Other user with name or Email)',
  })
  //@UsePipes(new ZodValidationPipe(createEjercicioInSchema))
  async create(
    @Body(new ValidationPipe()) createEjercicioDto: CreateEjercicioInDto,
  ) {
    return await this.ejercicioService.createEjercicio(createEjercicioDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all ejercicio' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden Response' })
  async findAll() {
    return await this.ejercicioService.getAllEjercicio();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get one ejercicio by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden Response' })
  async findOne(
    @Param('id')
    id: number,
  ) {
    return await this.ejercicioService.getEjercicio(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update one ejercicio by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden Response' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEjercicioDto: UpdateEjercicioInDto,
  ) {
    return this.ejercicioService.updateEjercicio(id, updateEjercicioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one ejercicio by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden Response' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const name = req.ejercicio.name;
    return this.ejercicioService.deleteEjercicio(id, name);
  }

  @Get('test-ejercicio')
  @Rols(Role.ADMIN)
  async getP() {
    return 'Brrrr';
  }
}
