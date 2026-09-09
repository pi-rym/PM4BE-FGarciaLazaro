import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers();

    }

    @Get(":id")
    getUserById(@Param("id") id: string) {
        return this.usersService.getUserById(id)
    }

    @Post()
    createNewUser(@Body() user: any){
        this.usersService.createNewUser(user)
    }

    @Put(":id")
    updateProfile(@Param("id") id: string, @Body() userProfileUpdate:any){
        this.usersService.updateProfile(id, userProfileUpdate)
    }

    @Delete(":id")
    deleteUserById(@Param("id") id: string){
        this.usersService.deleteUserById(id)
    }

}
