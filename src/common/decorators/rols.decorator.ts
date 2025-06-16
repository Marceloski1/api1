import { SetMetadata } from '@nestjs/common';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  TRAINER = 'trainer',
}

export const ROLS_KEY = 'rols';
export const Rols = (...rols: Role[]) => SetMetadata(ROLS_KEY, rols);
