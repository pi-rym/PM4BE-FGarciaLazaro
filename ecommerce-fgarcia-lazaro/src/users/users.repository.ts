import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { allUsers as seedUsers } from 'src/utils/data';
import { Users } from 'src/users/entities/users.entity';
import { Status } from 'src/common/enums/status.enum';
import { Repository } from 'typeorm';
import { ChangePasswordDto, CreateUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly ormUsersRepository: Repository<Users>,
  ) {}

  async getAllUsers(validPage: number, validLimit: number): Promise<Omit<Users, 'password'>[]> {
    const allUsers = await this.ormUsersRepository.find({
      where: { status: Status.ENABLE },
      order: { email: 'ASC' },
      skip: (validPage - 1) * validLimit, 
      take: validLimit, 
    });

    return allUsers.map(({ password, ...userNoPass }) => userNoPass);
  }

  async getUserById(id: string): Promise<Omit<Users, 'password'>> {
    const userFound = await this.ormUsersRepository.findOne({
      where: { id, status: Status.ENABLE },
      relations: {
        orders_id: {
          orderDetails: {
            products: true,
          },
        },
      },
    });
    if (!userFound) throw new NotFoundException(`No se encontró un usuario con id: ${id}`);

    const { password, ...userFoundNoPass } = userFound;
    return userFoundNoPass;
  }

  // También encuentra usuarios deshabilitados, porque su email sigue ocupado:
  getUserByEmail(email: string): Promise<Users | null> {
    return this.ormUsersRepository.findOneBy({ email });
  }

  async addUsers(): Promise<string> {
    await this.ormUsersRepository
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values(seedUsers)
      // Si el email ya existe, se deja ese usuario como está:
      .orIgnore()
      .execute();

    return 'Usuarios agregados';
  }

  async createNewUser(user: CreateUserDto): Promise<string> {
    const existingUser = await this.getUserByEmail(user.email);
    if (existingUser) throw new ConflictException(`Ya existe un usuario con el email: ${user.email}`);

    const savedUser = await this.ormUsersRepository.save(user);
    return savedUser.id;
  }

  async changePassword(id: string, passwords: ChangePasswordDto): Promise<string> {
    const userFound = await this.ormUsersRepository.findOneBy({ id, status: Status.ENABLE });
    if (!userFound) throw new NotFoundException(`No se encontró un usuario con id: ${id}`);
    if (userFound.password !== passwords.currentPassword) {
      throw new BadRequestException('La contraseña actual es incorrecta');
    }

    await this.ormUsersRepository.update(id, { password: passwords.newPassword });
    return `Se actualiza la contraseña del usuario con id: ${id}`;
  }

  async updateProfile(id: string, userProfileUpdate: UpdateUserDto): Promise<Omit<Users, 'password'>> {
    const userFound = await this.ormUsersRepository.findOneBy({ id, status: Status.ENABLE });
    if (!userFound) throw new NotFoundException(`No se encontró un usuario con id: ${id}`);

    
    const mergedUser = this.ormUsersRepository.merge(userFound, userProfileUpdate, { id });
    const { password, ...userNoPass } = await this.ormUsersRepository.save(mergedUser);
    return userNoPass;
  }

  async deleteUserById(id: string): Promise<string> {
    const foundUser = await this.ormUsersRepository.findOneBy({ id, status: Status.ENABLE });
    if (!foundUser) throw new NotFoundException(`No se encontró un usuario con id: ${id}`);

    await this.ormUsersRepository.update(id, { status: Status.DISABLE });
    
    return id;
  }
}
