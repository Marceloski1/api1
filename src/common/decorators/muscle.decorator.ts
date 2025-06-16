import { SetMetadata } from '@nestjs/common';

export enum Muscle {
  TRAPEZIUS = 'Trapezius',
  DELTOIDS = 'Deltoids',
  PECTORALS = 'Pectorals',
  BACK = 'Back',
  ABDOMINALS = 'Abdominals',
  BICEPS = 'Biceps',
  TRICEPS = 'Triceps',
  LEGS = 'Legs',
  GLUTEAL = 'Gluteal',
}

export const MUSCLE_KEY = 'muscles';
export const Muscles = (...muscle: string[]) => SetMetadata(MUSCLE_KEY, muscle);
