import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export default class LoggerMidleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log({
      time: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
    }),
      next();
  }

  async print() {
    await console.log('|||||||||||||||||||||');
  }
}
