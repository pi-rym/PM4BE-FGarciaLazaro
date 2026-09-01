import { Injectable } from '@nestjs/common';
import { Products, ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(private readonly productsController: ProductsRepository) {}

    getAllProducts() : Products[]{
        return this.productsController.getAllProducts();
        
    }
}
