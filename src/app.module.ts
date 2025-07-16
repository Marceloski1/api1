import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { EjercicioModule } from './ejercicio/ejercicio.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config/env.schema';
import { ThrottlerModule } from '@nestjs/throttler';
import { ReportsModule } from './reports/reports.module';
import LoggerMidleware from './common/middlewares/logger.middleware';
import { EjercicioController } from './ejercicio/ejercicio.controller';
import { AuthController } from './auth/auth.controller';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(LoggerMidleware).forRoutes('auth'); //Aplicar el middleware a toda la ruta
    //consumer.apply(LoggerMidleware).forRoutes({ path: 'v1/ejercicio', method: RequestMethod.GET }); // Aplicar la solicitud a un tipo de peticion
    //consumer.apply(LoggerMidleware).forRoutes({ path: 'auth/*splat', method: RequestMethod.POST }); //El middleware se ejecutara en cualquier ruta que inicie con lo señalado con splat
    //consumer.apply(LoggerMidleware).forRoutes(EjercicioController) ;
    /*consumer
      .apply(LoggerMidleware)
      .exclude(
        { path: 'v1/ejercicio', method: RequestMethod.POST },
        'auth/{*splat}',                                          Para no usar una ruta/metodos en especifico
      )
      .forRoutes(EjercicioController, AuthController); 
      */
  }
}

/*
Advertencia
Al usar el adaptador express, la aplicación NestJS registrará json y urlencoded desde 
el body-parser paquete de forma predeterminada. Esto significa que si quieres personalizar ese middleware a través de MiddlewareConsumer, 
debes desactivar el middleware global configurando el indicador bodyParser en false al crear la aplicación con NestFactory.create()
*/
