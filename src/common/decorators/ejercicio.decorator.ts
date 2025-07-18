import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const EjercicioDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const ejercicio = request.ejercicio;

    return data ? ejercicio?.[data] : ejercicio;
  },
);
