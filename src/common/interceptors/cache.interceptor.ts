import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCache = true;
    if (isCache) {
      return of([]);
    }
    return next.handle();
  }
}

/*
Nuestro CacheInterceptor tiene una variable ISCACHED y una respuesta codificada y una respuesta dura [] también. El punto clave a tener en cuenta es que devolvemos una nueva transmisión aquí, creada por el operador RXJS <Sd4> of () , 
por lo tanto, el controlador de ruta <SD5> no se llamará en absoluto. Cuando alguien llama a un punto final que utiliza CacheInterceptor, la respuesta (una matriz vacía codificada) se devolverá de inmediato. 
*/
