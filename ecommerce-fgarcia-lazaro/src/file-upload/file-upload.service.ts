

import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/products.entity';
import { Status } from 'src/common/enums/status.enum';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {

  constructor(private readonly fileUploadRepository: FileUploadRepository, @InjectRepository(Products) private readonly ormProductsRepository: Repository<Products>) {}

  async uploadImage(productId: string, file: Express.Multer.File) {


const product = await this.ormProductsRepository.findOne({ where: { id: productId, status: Status.ENABLE }, relations: { category: true } })
if (!product) throw new NotFoundException(`Producto con id: ${productId} no encontrado`)

    const result = await this.fileUploadRepository.uploadImage(file);

    if(!result.secure_url) throw new NotFoundException(`Falla al cargar la imagen en Cloudinary`)

        await this.ormProductsRepository.update(productId, {imgUrl: result.secure_url, })

    return { ...product, imgUrl: result.secure_url };
  }
}