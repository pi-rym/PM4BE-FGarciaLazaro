import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { allUsers as seedUsers } from 'src/utils/data';
import { Users } from 'src/users/entities/users.entity';
import { Status } from 'src/common/enums/status.enum';
import { Role } from 'src/common/enums/roles.enum';
import { AuthUser } from 'src/auth/interfaces/auth-request.interface';
import { In, Repository } from 'typeorm';
import { ChangePasswordDto, CreateUserDto, UpdateUserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly ormUsersRepository: Repository<Users>,
  ) {}

  // isAdmin solo se muestra en GET /users; en el resto de las respuestas se quita junto con la contraseña:
  private toPublicUser({ password, isAdmin, ...user }: Users): Omit<Users, 'password' | 'isAdmin'> {
    return user;
  }

  // Una cuenta solo la puede ver o modificar su propio usuario o un admin:
  private checkOwnerOrAdmin(id: string, requester: AuthUser, action: string): void {
    if (id !== requester.id && !requester.roles.includes(Role.ADMIN)) {
      throw new ForbiddenException(`Solo el propio usuario o un admin pueden ${action} esta cuenta`);
    }
  }

  async getAllUsers(validPage: number, validLimit: number): Promise<Omit<Users, 'password'>[]> {
    const allUsers = await this.ormUsersRepository.find({
      where: { status: Status.ENABLE },
      order: { email: 'ASC' },
      skip: (validPage - 1) * validLimit, 
      take: validLimit, 
    });

    return allUsers.map(({ password, ...userNoPass }) => userNoPass);
  }

  async getUserById(id: string, requester: AuthUser): Promise<Omit<Users, 'password' | 'isAdmin'>> {
    this.checkOwnerOrAdmin(id, requester, 'ver');
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

    return this.toPublicUser(userFound);
  }

  // También encuentra usuarios deshabilitados, porque su email sigue ocupado:
  getUserByEmail(email: string): Promise<Users | null> {
    return this.ormUsersRepository.findOneBy({ email });
  }

  async addUsers(): Promise<Omit<Users, 'password' | 'isAdmin'>[]> {
    const seedEmails = seedUsers.map((user) => user.email);
    const existingUsers = await this.ormUsersRepository.findBy({ email: In(seedEmails) });

    // Solo se hashean los que todavía no están, así no se repite el trabajo en cada arranque:
    const newUsers = await Promise.all(
      seedUsers
        .filter((user) => !existingUsers.some((existing) => existing.email === user.email))
        .map(async (user) => ({ ...user, password: await bcrypt.hash(user.password, SALT_ROUNDS) })),
    );

    if (newUsers.length) {
      await this.ormUsersRepository
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values(newUsers)
        // Si el email ya existe, se deja ese usuario como está:
        .orIgnore()
        .execute();
    }

    const seededUsers = await this.ormUsersRepository.find({
      where: { email: In(seedEmails) },
      order: { email: 'ASC' },
    });
    return seededUsers.map((user) => this.toPublicUser(user));
  }

  async createNewUser(user: Omit<CreateUserDto, 'confirmPassword'>): Promise<Omit<Users, 'password' | 'isAdmin'>> {
    const existingUser = await this.getUserByEmail(user.email);
    if (existingUser) throw new ConflictException(`Ya existe un usuario con el email: ${user.email}`);

    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    const savedUser = await this.ormUsersRepository.save({ ...user, password: hashedPassword });
    return this.toPublicUser(savedUser);
  }

  async changePassword(id: string, passwords: ChangePasswordDto, requester: AuthUser): Promise<string> {
    this.checkOwnerOrAdmin(id, requester, 'cambiar la contraseña de');
    const userFound = await this.ormUsersRepository.findOneBy({ id, status: Status.ENABLE });
    if (!userFound) throw new NotFoundException(`No se encontró un usuario con id: ${id}`);
    const isCurrentPassword = await bcrypt.compare(passwords.currentPassword, userFound.password);
    if (!isCurrentPassword) {
      throw new BadRequestException('La contraseña actual es incorrecta');
    }

    const hashedPassword = await bcrypt.hash(passwords.newPassword, SALT_ROUNDS);
    await this.ormUsersRepository.update(id, { password: hashedPassword });
    return `Se actualiza la contraseña del usuario con id: ${id}`;
  }

  async updateProfile(id: string, userProfileUpdate: UpdateUserDto, requester: AuthUser): Promise<Omit<Users, 'password' | 'isAdmin'>> {
    this.checkOwnerOrAdmin(id, requester, 'editar');
    const userFound = await this.ormUsersRepository.findOneBy({ id, status: Status.ENABLE });
    if (!userFound) throw new NotFoundException(`No se encontró un usuario con id: ${id}`);

    
    const mergedUser = this.ormUsersRepository.merge(userFound, userProfileUpdate, { id });
    return this.toPublicUser(await this.ormUsersRepository.save(mergedUser));
  }

  async deleteUserById(id: string, requester: AuthUser): Promise<string> {
    this.checkOwnerOrAdmin(id, requester, 'eliminar');
    const foundUser = await this.ormUsersRepository.findOneBy({ id, status: Status.ENABLE });
    if (!foundUser) throw new NotFoundException(`No se encontró un usuario con id: ${id}`);

    await this.ormUsersRepository.update(id, { status: Status.DISABLE });
    
    return id;
  }
}
