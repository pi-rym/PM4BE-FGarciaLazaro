import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
const request = context.switchToHttp().getRequest();
const barerRequest = request.headers["authorization"]

if(!barerRequest) throw new UnauthorizedException("Falta el header Authorization")

const auth = barerRequest.split(" ")[1];
const [email, password] = auth ? auth.split(":") : [];

if(!email || !password) throw new UnauthorizedException("El header Authorization debe tener el formato: Bearer email:password")

    return true;
  }
}
