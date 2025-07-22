import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;
    const now = Date.now();
    const delay = `Time for execution = ${Date.now() - now}ms`;
    return next.handle().pipe(
      tap(() => {
        console.log(`${method} ${url} - ${delay}ms`);
      }),
    );
  }
}
