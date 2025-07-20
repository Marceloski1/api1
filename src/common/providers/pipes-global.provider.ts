import { Provider } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '../pipes/validation.pipe';

export const globalPipes: Provider[] = [
  {
    provide: APP_PIPE,
    useClass: ValidationPipe, //Realizar cambios en el validation Pipe puesto que esta centrado solo en number
  },
];
