import {
  Injectable,
  NestMiddleware,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class MaintenanceMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new ServiceUnavailableException(); // Este es un middlewre que previene acceder a un servicio en caso de que se le esten
    //   haciendo cambios grandes como cambiar la pasarela de pago
    next();
  }
}
