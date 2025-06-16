import Ejercicio from '../entities/ejercicio.entity';

export interface CreateEjercicio {
  createEjercicio(ejercicio: Ejercicio): void;
}
