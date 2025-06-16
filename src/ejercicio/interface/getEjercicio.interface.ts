import Ejercicio from '../entities/ejercicio.entity';

export interface GetEjercicio {
  getEjercicio(id: number): Ejercicio;
}
