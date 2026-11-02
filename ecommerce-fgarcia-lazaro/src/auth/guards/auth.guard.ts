import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Status } from 'src/common/enums/status.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  // DataSource lo comparte TypeORM con toda la app, así el guard funciona en cualquier módulo:
  constructor(private readonly jwtService: JwtService, private readonly dataSource: DataSource) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
const request = context.switchToHttp().getRequest();
const barerRequest = request.headers["authorization"]

if(!barerRequest) throw new UnauthorizedException("Falta el token")

const [type, token] = barerRequest.split(" ");

if(type !== "Bearer" || !token) throw new UnauthorizedException("El header Authorization debe tener el formato: Bearer <token>")

let payload
try {
  // Se verifica con JWT_SECRET, que JwtModule toma de las variables de entorno:
  payload = this.jwtService.verify(token)
} catch {
  throw new UnauthorizedException("Token inválido o expirado")
}

// El token puede seguir vigente aunque el usuario se haya deshabilitado después de loguearse:
const isEnabled = await this.dataSource.getRepository(Users).existsBy({ id: payload.id, status: Status.ENABLE })
if(!isEnabled) throw new UnauthorizedException("El usuario del token no existe o está deshabilitado")

// iat y exp vienen en segundos; se adjuntan como fechas:
request.user = { ...payload, iat: new Date(payload.iat * 1000), exp: new Date(payload.exp * 1000) }

    return true;
  }
}
