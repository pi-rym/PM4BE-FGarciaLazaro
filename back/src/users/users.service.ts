import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    findAllUsers(){
        console.log("llamando a get /users")
    }
}
