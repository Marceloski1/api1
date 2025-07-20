import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import type { Response } from 'express';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((user) => {
        console.log(user);
        const response = context.switchToHttp().getResponse<Response>();
        const token = this.authService.register(user);

        response.setHeader(`Autorization`, `Bearer${token}`);
        /* response.cookie('token', token, {
          httpOnly: true,   //Trabajo con cookies
          signed: true,
        });*/
        return user;
      }),
    );
  }
}
