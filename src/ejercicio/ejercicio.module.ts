import { Module } from '@nestjs/common';
import { EjercicioService } from './ejercicio.service';
import { EjercicioController } from './ejercicio.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/common/exceptions/http.exception.filter';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { LoggingInterceptor } from 'src/common/interceptors/login.interceptor';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [EjercicioController],
  providers: [
    EjercicioService,
    RolesGuard,
    JwtAuthGuard,
    ValidationPipe,
    /*{
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },*/
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [EjercicioService],
})
export class EjercicioModule {}
