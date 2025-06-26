import { Module } from '@nestjs/common';
import { EjercicioModule } from './ejercicio/ejercicio.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config/env.schema';
import { ThrottlerModule } from '@nestjs/throttler';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envSchema,
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 30,
      },
    ]),
    EjercicioModule,
    UserModule,
    AuthModule,
    DatabaseModule,
    MailModule,
    ReportsModule,
  ],
})
export class AppModule {}
