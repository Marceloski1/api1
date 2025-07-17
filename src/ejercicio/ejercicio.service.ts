import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateEjercicioInDto } from './dto/in/create-ejercicio.dto';
import { UpdateEjercicioInDto } from './dto/in/update-ejercicio.dto';
import Ejercicio from './entities/ejercicio.entity';
import DatabaseService from 'src/database/database.service';
import EjercicioOutDto from './dto/out/ejercicio.out.dto';
import createPatchFields from 'src/common/dto/patch/patch-field.util';

@Injectable()
export class EjercicioService {
  private readonly logger = new Logger(EjercicioService.name);

  constructor(private readonly dataBaseService: DatabaseService) {}

  async createEjercicio(createEjercicioInDto: CreateEjercicioInDto) {
    const name = createEjercicioInDto.name;
    this.existEjercicioByName(name);
    const newEjercicio = await this.dataBaseService.ejercicio.create({
      name: createEjercicioInDto.name,
      description: createEjercicioInDto.description,
      muscle: createEjercicioInDto.muscle,
    });
    await this.dataBaseService.ejercicio.save(newEjercicio);
    this.logger.log('Create a new ejercicio');
    return this.toOutDto(newEjercicio);
  }

  async deleteEjercicio(id: number, name: string): Promise<void> {
    this.notExistEjercicioByName(name);
    //Revisar logica para asignar los ejercicios
    const ejericioDelete = await this.dataBaseService.ejercicio.delete(id);
    if (ejericioDelete.affected === 0) {
      throw new NotFoundException(`Ejercicio with ID ${id} not found`);
    }
    this.logger.log(`Deleted user with ID ${id}`);
  }

  //Revisar logica
  async updateEjercicio(
    id: number,
    userEjercicioiNDto: UpdateEjercicioInDto,
  ): Promise<void> {
    const ejercicio = await this.notExistEjercicio(id);
    const patchDto = createPatchFields(userEjercicioiNDto);
    await this.dataBaseService.ejercicio.update(id, patchDto);
    this.logger.log(`Updated ejercicio with ID ${id}`);
    this.logger.log({ ...patchDto });
  }

  async getAllEjercicio(): Promise<EjercicioOutDto[]> {
    const ejercicios = await this.dataBaseService.ejercicio.find();
    return ejercicios.map((ejercicio) => this.toOutDto(ejercicio));
  }

  async getEjercicio(id: number): Promise<EjercicioOutDto> {
    const ejercicio = await this.notExistEjercicio(id);
    return this.toOutDto(ejercicio);
  }

  async notExistEjercicio(id: number): Promise<Ejercicio> {
    const existEjercicio = await this.dataBaseService.ejercicio.findOne({
      where: { id },
    });
    if (!existEjercicio) {
      throw new ConflictException('Ejercicio with this id does exist');
    }
    return existEjercicio;
  }

  //Revisar logica
  async existEjercicio(id: number): Promise<boolean> {
    const existEjercicio = await this.dataBaseService.ejercicio.findOne({
      where: { id },
    });
    if (existEjercicio) {
      throw new ConflictException('Ejercicio with this id is already exist');
    }
    return existEjercicio ? false : true;
  }

  async notExistEjercicioByName(name: string): Promise<Ejercicio> {
    const existEjercicioByName = await this.dataBaseService.ejercicio.findOne({
      where: { name },
    });
    if (!existEjercicioByName) {
      throw new ConflictException('Ejercicio with this name is alreafy exist');
    }
    return existEjercicioByName;
  }

  //Revisar logica
  async existEjercicioByName(name: string): Promise<boolean> {
    const existEjercicioByName = await this.dataBaseService.ejercicio.findOne({
      where: { name },
    });
    if (existEjercicioByName) {
      throw new ConflictException('Ejercicio with this name is alreafy exist');
    }
    return existEjercicioByName ? false : true;
  }

  private toOutDto(ejercicio: Ejercicio) {
    return {
      id: ejercicio.id,
      name: ejercicio.name,
      description: ejercicio.description,
      muscle: ejercicio.muscle,
    };
  }
}
