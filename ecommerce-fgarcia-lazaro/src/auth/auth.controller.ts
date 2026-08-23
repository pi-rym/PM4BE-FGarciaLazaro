import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService : AuthService  ){}
    @Get()
    isLogued(){
        this.AuthService.isLogued()
        return "Se llamo al endpoint de auth"
    }
}
