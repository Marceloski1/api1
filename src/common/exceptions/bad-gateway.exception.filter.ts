import {
  ArgumentsHost,
  BadGatewayException,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import path from 'path';
import { timestamp } from 'rxjs';

@Catch(BadGatewayException)
export class BadGatewayExceptionFilter implements ExceptionFilter {
  catch(exception: BadGatewayException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      success: false,
      method: request.method,
      exception: exception.message,
    });
  }
}
