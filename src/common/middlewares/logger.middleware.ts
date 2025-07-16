import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export default class LoggerMidleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Request...', new Date().toUTCString());
    console.log(req.rawHeaders);
    //this.print();
    //console.log(res);
    next();
  }

  async print() {
    await console.log('|||||||||||||||||||||');
  }
}
