import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    req.context = {
      requestId: crypto.randomUUID(),
      user: req.user || null,
    };
    next();
  }
}
