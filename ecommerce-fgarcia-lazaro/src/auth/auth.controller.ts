import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/users.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService : AuthService  ){}
    @Get()
    isLogued(){
        this.AuthService.isLogued()
        return "Se llamo al endpoint de auth"
    }
    @Post("signin")
    signIn(@Body() credentials: LoginUserDto){
const {email, password} = credentials;
return this.AuthService.signIn(email, password)
    }
}
