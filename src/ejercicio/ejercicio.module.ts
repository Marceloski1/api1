import { Module } from '@nestjs/common';
import { EjercicioService } from './ejercicio.service';
import { EjercicioController } from './ejercicio.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/common/exceptions/http.exception.filter';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [EjercicioController],
  providers: [
    EjercicioService,
    RolesGuard,
    JwtAuthGuard,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [EjercicioService],
})
export class EjercicioModule {}
