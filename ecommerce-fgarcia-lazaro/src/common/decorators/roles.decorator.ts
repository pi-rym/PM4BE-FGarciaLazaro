import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/roles.enum';

// Decorador personalizado: @Roles(Role.ADMIN) guarda en la ruta qué roles pueden usarla.
// Despues el RolesGuard lee ese dato con la misma clave:
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
