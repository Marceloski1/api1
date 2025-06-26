import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ROLS_KEY } from '../decorators/rols.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtAuthGuard: JwtAuthGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isAutenticated = await this.jwtAuthGuard.canActivate(context);

    if (!isAutenticated) {
      return false;
    }

    const user = request.user;

    const requiredRoles = this.getRequiredRoles(context);

    console.log(JSON.stringify(requiredRoles));
    if (!requiredRoles.includes(user.role))
      throw new ForbiddenException('Access denied');

    return true;
  }

  private getRequiredRoles(context: ExecutionContext): string[] {
    const handler = context.getHandler();
    return Reflect.getMetadata(ROLS_KEY, handler) || [];
  }
}
