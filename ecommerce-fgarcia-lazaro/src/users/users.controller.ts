import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
// "import type" porque es solo un tipo y se usa en un parámetro con decorador (lo pide isolatedModules):
import type { AuthRequest } from 'src/auth/interfaces/auth-request.interface';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { ChangePasswordDto, UpdateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    @Get()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
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
    getUserById(@Param("id", ParseUUIDPipe) id: string, @Req() request: AuthRequest) {
        return this.usersService.getUserById(id, request.user)
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    updateProfile(@Param("id", ParseUUIDPipe) id: string, @Body() userProfileUpdate: UpdateUserDto, @Req() request: AuthRequest){
      return  this.usersService.updateProfile(id, userProfileUpdate, request.user)
    }

    @Put(":id/password")
    @UseGuards(AuthGuard)
    changePassword(@Param("id", ParseUUIDPipe) id: string, @Body() passwords: ChangePasswordDto, @Req() request: AuthRequest){
      return  this.usersService.changePassword(id, passwords, request.user)
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    deleteUserById(@Param("id", ParseUUIDPipe) id: string, @Req() request: AuthRequest){
       return this.usersService.deleteUserById(id, request.user)
    }

}
