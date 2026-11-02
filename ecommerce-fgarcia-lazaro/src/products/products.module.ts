import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/categories/entities/categories.entity';
import { Products } from 'src/products/entities/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService]
})
export class ProductsModule {}
