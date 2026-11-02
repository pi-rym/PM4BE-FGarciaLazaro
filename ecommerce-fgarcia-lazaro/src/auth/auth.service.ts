import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import { Status } from 'src/common/enums/status.enum';

@Injectable()

export class AuthService {
    constructor(private readonly userRepository: UserRepository){}
    isLogued(){
         console.log("llamando a get /Auth")
        
    }

    async signIn(email: string, password: string){
const foundUser = await this.userRepository.getUserByEmail(email)
if(!foundUser || foundUser.status !== Status.ENABLE) {throw new UnauthorizedException("Email o Password incorrectos") }
if(foundUser.password !==password){throw new UnauthorizedException("Email o Password incorrectos")}
return "Usuario Logueado (TOKEN)."

    }

}
