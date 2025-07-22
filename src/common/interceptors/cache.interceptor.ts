import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const cache = new Map();

    const request = context.switchToHttp().getRequest();

    // Clave más elaborada :${JSON.stringify(request.params)}:${JSON.stringify(request.query)}:${request.headers['authorization']
    const key = `${request.method}:${request.originalUrl}`;

    // Revisar si existe en caché y aún válida
    if (cache.has(key)) {
      const cached = cache.get(key);
      if (cached.expires > Date.now()) {
        console.log(`Returning cached response for ${key}`);
        return of(cached);
      } else {
        cache.delete(key);
      }
    }

    /*
    const isCache = true;
    if (!isCache) {
      return of([]);
    }*/
    console.log(key);
    return next
      .handle()
      .pipe(
        tap((data) => cache.set(key, { data, expires: Date.now() + 60000 })),
      );
  }
}

/*
Nuestro CacheInterceptor tiene una variable ISCACHED y una respuesta codificada y una respuesta dura [] también. El punto clave a tener en cuenta es que devolvemos una nueva transmisión aquí, creada por el operador RXJS <Sd4> of () , 
por lo tanto, el controlador de ruta <SD5> no se llamará en absoluto. Cuando alguien llama a un punto final que utiliza CacheInterceptor, la respuesta (una matriz vacía codificada) se devolverá de inmediato. 
*/
