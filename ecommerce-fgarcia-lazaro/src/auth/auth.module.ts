import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { environment } from 'src/config/enviroment';


@Module({
  imports: [
    UsersModule,
    // global: el JwtService queda disponible en toda la app, por ejemplo para el AuthGuard:
    JwtModule.register({ global: true, secret: environment.JWT_SECRET, signOptions: { expiresIn: '1h' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService]

})
export class AuthModule {}
