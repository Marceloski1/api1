import { forwardRef, Module } from '@nestjs/common';
import { EjercicioService } from './ejercicio.service';
import { EjercicioController } from './ejercicio.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { ReportsModule } from 'src/reports/reports.module';

@Module({
  imports: [DatabaseModule, ConfigModule, forwardRef(() => ReportsModule)],
  controllers: [EjercicioController],
  providers: [EjercicioService, RolesGuard, JwtAuthGuard, ValidationPipe],
  exports: [EjercicioService],
})
export class EjercicioModule {}
