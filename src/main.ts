import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import setupSwagger from './config/swagger.setup';
import initSetup from './config/init.setup';
import seedersSetup from './config/seeders.setup';
const SWAGGER_PATH = '/doc';
import * as cors from 'cors';
import setupLogging from './config/loggin.setup';
import { NotFoundException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get<number>('APP_PORT');
  //app.useGlobalFilters(new HttpExceptionFilter());
  setupSwagger(app, SWAGGER_PATH);
  initSetup(app);
  await seedersSetup(app);

  if (!port) {
    throw new NotFoundException('Not port assigned');
  }
  await app.listen(port);

  setupLogging(app, SWAGGER_PATH);

  app.use(cors(corsOptions));
}
bootstrap();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Accept',
};
