import { Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from '../exceptions/all.exception.filter';
import { HttpExceptionFilter } from '../exceptions/http.exception.filter';
import { NotFoundFilter } from '../exceptions/notFound.exception.filter';
import { BadGatewayExceptionFilter } from '../exceptions/bad-gateway.exception.filter';
import { UnauthorizedExceptionFilter } from '../exceptions/unauthorized.exception.filter';
import { LoginExceptionFilter } from '../exceptions/login.exception.filter';

export const globalFilter: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: NotFoundFilter,
  },
  {
    provide: APP_FILTER,
    useClass: UnauthorizedExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: BadGatewayExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: LoginExceptionFilter,
  },
];
