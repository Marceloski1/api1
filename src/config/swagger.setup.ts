import * as basicAuth from 'express-basic-auth';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function setupSwagger(
  app: INestApplication,
  swaggerPath: string,
) {
  const swaggerPassword = app.get(ConfigService).get('SWAGGER_PASSWORD');
  const options = new DocumentBuilder()
    .setTitle('Ejercicios api')
    .setDescription(
      '### API para que los entrenadores gestionen sus clientes en el gym.',
    )
    .setLicense('MIT', 'https://opensource.org/license/mit')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, options);

  const paths = Object.keys(doc.paths).sort();
  const sortedPaths = {};
  paths.forEach((path) => {
    sortedPaths[path] = doc.paths[path];
  });

  doc.paths = sortedPaths;

  if (doc.components && doc.components.schemas) {
    const schemas = Object.keys(doc?.components.schemas).sort();
    const sortedSchemas = {};
    schemas.forEach((schema) => {
      if (doc.components && doc.components.schemas)
        sortedSchemas[schema] = doc.components.schemas[schema];
    });
    doc.components.schemas = sortedSchemas;
  }

  if (process.env.NODE_ENV !== 'develoment') {
    app.use(
      [swaggerPath, `${swaggerPath}-json`],
      basicAuth({
        challenge: true,
        users: {
          marcelo: swaggerPassword,
        },
      }),
    );
  }

  SwaggerModule.setup(swaggerPath, app, doc);
}
