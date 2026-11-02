import { Request } from 'express';
import { Role } from 'src/common/enums/roles.enum';

// Datos del token que el AuthGuard deja en request.user después de validarlo:
export interface AuthUser {
  id: string;
  email: string;
  roles: Role[];
  iat: Date;
  exp: Date;
}

export interface AuthRequest extends Request {
  user: AuthUser;
}
