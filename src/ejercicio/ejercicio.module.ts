import { Module } from '@nestjs/common';
import { EjercicioService } from './ejercicio.service';
import { EjercicioController } from './ejercicio.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [EjercicioController],
  providers: [EjercicioService],
  exports: [EjercicioService],
})
export class EjercicioModule {}
