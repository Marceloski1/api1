import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EjercicioService } from './ejercicio.service';
import { CreateEjercicioDto } from './dto/create-ejercicio.dto';
import { UpdateEjercicioDto } from './dto/update-ejercicio.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('ejercicio')
@Controller('ejercicio')
export class EjercicioController {
  constructor(private readonly ejercicioService: EjercicioService) {}
  /*
  @Post()
  @ApiOperation({ summary: 'Create one ejercicio' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createEjercicioDto: CreateEjercicioDto) {
    return this.ejercicioService.create(createEjercicioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ejercicio' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden Response' })
  findAll() {
    return this.ejercicioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one ejercicio by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden Response' })
  findOne(@Param('id') id: string) {
    return this.ejercicioService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one ejercicio by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden Response' })
  update(
    @Param('id') id: string,
    @Body() updateEjercicioDto: UpdateEjercicioDto,
  ) {
    return this.ejercicioService.update(+id, updateEjercicioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one ejercicio by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden Response' })
  remove(@Param('id') id: string) {
    return this.ejercicioService.remove(+id);
  }
    */
}
