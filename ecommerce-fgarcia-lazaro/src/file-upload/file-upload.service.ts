

import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/products.entity';
import { Status } from 'src/common/enums/status.enum';
import { Role } from 'src/common/enums/roles.enum';
import { AuthUser } from 'src/auth/interfaces/auth-request.interface';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {

  constructor(private readonly fileUploadRepository: FileUploadRepository, @InjectRepository(Products) private readonly ormProductsRepository: Repository<Products>) {}

  async uploadImage(productId: string, file: Express.Multer.File, requester: AuthUser) {


const product = await this.ormProductsRepository.findOne({ where: { id: productId, status: Status.ENABLE }, relations: { category: true, user: true } })
if (!product) throw new NotFoundException(`Producto con id: ${productId} no encontrado`)

// Solo cambia la imagen el usuario que cargó el producto o un admin, y se comprueba antes de subir nada:
if (product.user?.id !== requester.id && !requester.roles.includes(Role.ADMIN)) {
  throw new ForbiddenException('Solo el usuario que cargó el producto o un admin pueden cambiar su imagen')
}

    const result = await this.fileUploadRepository.uploadImage(file);

    if(!result.secure_url) throw new NotFoundException(`Falla al cargar la imagen en Cloudinary`)

        await this.ormProductsRepository.update(productId, {imgUrl: result.secure_url, })

    // El dueño se cargó solo para comprobar el permiso; no se devuelve porque trae su contraseña:
    const { user, ...productWithoutUser } = product;
    return { ...productWithoutUser, imgUrl: result.secure_url };
  }
}
