import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CheckAdminMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const isAdmin = req.headers; ///No esta completo
    console.log(isAdmin);
    next();
  }
}
