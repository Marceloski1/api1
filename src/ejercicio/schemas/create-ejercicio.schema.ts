import { Muscle } from 'src/common/decorators/muscle.decorator';
import { z } from 'zod';

export const createEjercicioInSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    muscle: z.enum(Muscle),
  })
  .required();

export type CreateEjercicioInDto = z.infer<typeof createEjercicioInSchema>;
