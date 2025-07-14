import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { audit } from 'rxjs';

//Nest-test-resend
@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'), //Direccion del servidor SMTP con el que se trabaja (Ejemplo smtp.gmail.com o smtp.outlook.com)
          secure: false, //Para la conexion no segura se usara STATTILS
          port: configService.get('MAIL_PORT'), //Puerto del servidor SMTP
          auth: {
            user: configService.get('MAIL_USER'), //Usuario para la autentificacion
            pass: configService.get('MAIL_PASSWORD'), //Contraseña para la autentificacion
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
