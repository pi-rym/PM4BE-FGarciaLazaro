import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/users.repository';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { Status } from 'src/common/enums/status.enum';
import { Role } from 'src/common/enums/roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()

export class AuthService {
    constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService){}
    isLogued(){
         console.log("llamando a get /Auth")
        
    }

    async signIn(email: string, password: string){
const foundUser = await this.userRepository.getUserByEmail(email)
if(!foundUser || foundUser.status !== Status.ENABLE) {throw new UnauthorizedException("Email o Password incorrectos") }
const isPasswordValid = await bcrypt.compare(password, foundUser.password)
if(!isPasswordValid){throw new UnauthorizedException("Email o Password incorrectos")}

// El rol se asigna al firmar el token, según el campo isAdmin del usuario:
const payload = { id: foundUser.id, email: foundUser.email, roles: [foundUser.isAdmin ? Role.ADMIN : Role.USER] }
const token = this.jwtService.sign(payload)
return { message: "Usuario logueado", token }

    }

    async signUp(user: CreateUserDto){
// Que las contraseñas coincidan ya lo valida el DTO; confirmPassword no se guarda:
const { confirmPassword, ...newUser } = user
return this.userRepository.createNewUser(newUser)
    }

}
