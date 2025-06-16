import { Injectable, Logger } from '@nestjs/common';
import { CreateEjercicioDto } from './dto/create-ejercicio.dto';
import { UpdateEjercicioDto } from './dto/update-ejercicio.dto';
import { EjercicioI } from './interface/ejercicioI.interface';
import Ejercicio from './entities/ejercicio.entity';
import DatabaseService from 'src/database/database.service';

@Injectable()
export class EjercicioService {
  private readonly logger = new Logger(EjercicioService.name);

  //constructor(private readonly dataBase: DatabaseService) {}

  createEjercicio(ejercicio: Ejercicio): void {
    throw new Error('Method not implemented.');
  }
  deleteEjercicio(id: number): void {
    throw new Error('Method not implemented.');
  }
  updateEjercicio(id: number, ejercicio?: Ejercicio): void {
    throw new Error('Method not implemented.');
  }
  getAllEjercicio(): Array<Ejercicio> {
    throw new Error('Method not implemented.');
  }
  getEjercicio(id: number): Ejercicio {
    throw new Error('Method not implemented.');
  }

  create(createEjercicioDto: CreateEjercicioDto) {
    return 'This action adds a new ejercicio';
  }

  findAll() {
    return `This action returns all ejercicio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ejercicio`;
  }

  update(id: number, updateEjercicioDto: UpdateEjercicioDto) {
    return `This action updates a #${id} ejercicio`;
  }

  remove(id: number) {
    return `This action removes a #${id} ejercicio`;
  }
}
