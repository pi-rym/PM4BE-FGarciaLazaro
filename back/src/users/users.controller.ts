import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService){}
    @Get()
    findAllUsers(){
        this.UsersService.findAllUsers()
        return "Se llamo al endpoint de users"
    }

}
