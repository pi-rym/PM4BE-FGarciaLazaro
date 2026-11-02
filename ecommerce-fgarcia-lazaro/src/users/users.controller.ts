import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ChangePasswordDto, CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    @Get()
    @UseGuards(AuthGuard)
    getAllUsers(@Query("page") page?: String, @Query("limit") limit?: String): Promise<Omit<Users, "password">[]>{
        const pageNumber = Number(page)
        const limitNumber = Number(limit)

        const validPage = !isNaN(pageNumber) && pageNumber > 0 ? pageNumber : 1;
        const validLimit = !isNaN(limitNumber) && limitNumber > 0 ? limitNumber : 5 ;


        return this.usersService.getAllUsers(validPage, validLimit);

    }

    @Get('seeder')
    addUsers() {
        return this.usersService.addUsers()
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    getUserById(@Param("id", ParseUUIDPipe) id: string) {
        return this.usersService.getUserById(id)
    }

    @Post()
    createNewUser(@Body() user: CreateUserDto){
        
      return  this.usersService.createNewUser(user)
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    updateProfile(@Param("id", ParseUUIDPipe) id: string, @Body() userProfileUpdate: UpdateUserDto){
      return  this.usersService.updateProfile(id, userProfileUpdate)
    }

    @Put(":id/password")
    @UseGuards(AuthGuard)
    changePassword(@Param("id", ParseUUIDPipe) id: string, @Body() passwords: ChangePasswordDto){
      return  this.usersService.changePassword(id, passwords)
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    deleteUserById(@Param("id", ParseUUIDPipe) id: string){
       return this.usersService.deleteUserById(id)
    }

}
