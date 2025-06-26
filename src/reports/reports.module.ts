import { forwardRef, Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';
import { DatabaseModule } from 'src/database/database.module';
import { EjercicioModule } from 'src/ejercicio/ejercicio.module';
import { MailService } from 'src/mail/mail.service';
import { EjercicioService } from 'src/ejercicio/ejercicio.service';
import DatabaseService from 'src/database/database.service';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => EjercicioModule),
    MailModule,
    DatabaseModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService, MailService, EjercicioService],
  exports: [ReportsService],
})
export class ReportsModule {}
