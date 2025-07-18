import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Auth(...roles) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(), //Se esta usando el ApiBearerAuth del swagger pero esto es un error
    ApiUnauthorizedResponse({ description: 'Unauthorized' }), //Se esta usando el ApiUnauthorizedResponse del swagger pero esto es un error
  );
}

/*
Uso: 
@Get('users')
@Auth('admin')
findAllUsers() {}
*/

//Este es un ejemplo incompleto que debe ser pulido y testeado.
//Por el momento existe otra forma de autorizacion (no autentificacion) ppr roles
