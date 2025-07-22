import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const token = req.headers['authorization'];
    const secret = process.env.SECRET_KEY; //Esto no funcionara porque estas  comparando strings que no tienen que ver
    //console.log(secret); //Hay que hacer cambios más adelante
    if (!token) throw new UnauthorizedException();

    next();
  }
}
