import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Response } from './interceptor interface/responseI';
import { map, Observable } from 'rxjs';

export class SensibleInterceptor<T> implements NestInterceptor<Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<Response<T>>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        /*if (!data || data.password) {
          delete data.password;  //Example for delete sensible data
        }*/
        return data;
      }),
    );
  }
}
