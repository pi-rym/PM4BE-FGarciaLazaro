import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { Users } from './users.interface';
import { ChangePasswordDto, UpdateUserDto } from './dto/users.dto';
import { AuthUser } from 'src/auth/interfaces/auth-request.interface';

@Injectable()
export class UsersService {
    
    
    
    
    
    constructor(private readonly userRepository: UserRepository){}
    getAllUsers(validPage: number, validLimit: number): Promise<Omit<Users, "password">[]>{
        return this.userRepository.getAllUsers(validPage, validLimit);
    }

    addUsers() {
        return this.userRepository.addUsers()
    }

    getUserById(id: string, requester: AuthUser) {
        return this.userRepository.getUserById(id, requester)
    }
updateProfile(id: string, userProfileUpdate: UpdateUserDto, requester: AuthUser) {
       return this.userRepository.updateProfile(id, userProfileUpdate, requester)
    }

    changePassword(id: string, passwords: ChangePasswordDto, requester: AuthUser) {
       return this.userRepository.changePassword(id, passwords, requester)
    }

    deleteUserById(id: string, requester: AuthUser) {
       return this.userRepository.deleteUserById(id, requester)
    }
}
