import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';

const blockIpExample = ['123.123.123.123']; //Estoy probando esta funcionalidad. Ya tengo un rated limit en mi app.module

@Injectable()
export class BlockIpMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const ip = req.ip;
    if (blockIpExample.includes(ip)) {
      throw new ForbiddenException();
    }
    console.log(`User with id:${blockIpExample} try a DDos`);
    next();
  }
}
