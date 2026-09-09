import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { Users } from './users.interface';

@Injectable()
export class UsersService {
    
    
    
    
    
    constructor(private readonly userRepository: UserRepository){}
    getAllUsers(){
        return this.userRepository.getAllUsers();
    }

    getUserById(id: string) {
        return this.userRepository.getUserById(id)
    }
    createNewUser(user) {
        return this.userRepository.createNewUser(user)
    }
updateProfile(id: string, userProfileUpdate: any) {
        this.userRepository.updateProfile(id, userProfileUpdate)
    }
    
    deleteUserById(id: string) {
        this.userRepository.deleteUserById(id)
    }
}
