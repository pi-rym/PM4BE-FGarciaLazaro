import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { Users } from './users.interface';
import { ChangePasswordDto, CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    
    
    
    
    
    constructor(private readonly userRepository: UserRepository){}
    getAllUsers(validPage: number, validLimit: number): Promise<Omit<Users, "password">[]>{
        return this.userRepository.getAllUsers(validPage, validLimit);
    }

    addUsers() {
        return this.userRepository.addUsers()
    }

    getUserById(id: string) {
        return this.userRepository.getUserById(id)
    }
    createNewUser(user: CreateUserDto) {
        return this.userRepository.createNewUser(user)
    }
updateProfile(id: string, userProfileUpdate: UpdateUserDto) {
       return this.userRepository.updateProfile(id, userProfileUpdate)
    }

    changePassword(id: string, passwords: ChangePasswordDto) {
       return this.userRepository.changePassword(id, passwords)
    }
    
    deleteUserById(id: string) {
       return this.userRepository.deleteUserById(id)
    }
}
