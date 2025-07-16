import { HttpException, HttpStatus } from '@nestjs/common';

export default class ForbiddenException extends HttpException {
  constructor(err) {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
// { message: 'Forbidden' /*, cause: err, description: err.message */ },
