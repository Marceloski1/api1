import { PartialType } from '@nestjs/swagger';
import { CreateEjercicioDto } from './create-ejercicio.dto';

export class UpdateEjercicioDto extends PartialType(CreateEjercicioDto) {}
