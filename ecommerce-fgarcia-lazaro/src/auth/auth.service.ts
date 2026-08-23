import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    isLogued(){
         console.log("llamando a get /Auth")
        
    }
}
