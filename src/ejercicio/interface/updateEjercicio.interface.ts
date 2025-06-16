import Ejercicio from '../entities/ejercicio.entity';

export interface UpdateEjercicio {
  updateEjercicio(id: number, ejercicio?: Ejercicio): void;
}
