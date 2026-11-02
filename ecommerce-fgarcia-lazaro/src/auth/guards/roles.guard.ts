import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
// Los roles que pide la ruta con @Roles(...):
const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
if(!requiredRoles) return true

// request.user lo carga el AuthGuard, por eso tiene que ir antes que este guard:
const request = context.switchToHttp().getRequest();
const userRoles: Role[] = request.user?.roles ?? []

const hasRole = requiredRoles.some((role) => userRoles.includes(role))
if(!hasRole) throw new ForbiddenException("No tienes permisos para acceder a esta ruta")

    return true;
  }
}
