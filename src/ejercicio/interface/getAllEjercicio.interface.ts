import Ejercicio from '../entities/ejercicio.entity';

export interface GetAllEjercicio {
  getAllEjercicio(): Array<Ejercicio>;
}
