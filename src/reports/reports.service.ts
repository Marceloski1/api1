import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import DatabaseService from 'src/database/database.service';
import Ejercicio from 'src/ejercicio/entities/ejercicio.entity';
import { MailService } from 'src/mail/mail.service';
import { EjercicioService } from 'src/ejercicio/ejercicio.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly dataBaseService: DatabaseService,
    @Inject(forwardRef(() => EjercicioService))
    private readonly ejercicioService: EjercicioService,
    private readonly mailService: MailService,
  ) {}

  private readonly logger = new Logger(ReportsService.name);
  private readonly USERNAME: string = 'Marcelo';
}
