import { CreateEjercicio } from './createEjercicio.interface';
import { DeleteEjercicio } from './deleteEjercicio.interface';
import { GetAllEjercicio } from './getAllEjercicio.interface';
import { GetEjercicio } from './getEjercicio.interface';
import { UpdateEjercicio } from './updateEjercicio.interface';

export interface EjercicioI
  extends CreateEjercicio,
    DeleteEjercicio,
    UpdateEjercicio,
    GetAllEjercicio,
    GetEjercicio {}
