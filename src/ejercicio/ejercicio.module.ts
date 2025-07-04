import { Module } from '@nestjs/common';
import { EjercicioService } from './ejercicio.service';
import { EjercicioController } from './ejercicio.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [EjercicioController],
  providers: [EjercicioService, RolesGuard, JwtAuthGuard],
  exports: [EjercicioService],
})
export class EjercicioModule {}
