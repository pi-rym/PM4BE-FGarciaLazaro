import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from './products.interfaces';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';
import { AuthUser } from 'src/auth/interfaces/auth-request.interface';

@Injectable()
export class ProductsService {
    
    
    
    constructor(private readonly productsRepository: ProductsRepository) {}
    
    getAllProducts(validPage: number, validLimit: number) : Promise<Products[]>{
        return this.productsRepository.getAllProducts(validPage, validLimit);

    }

     addProducts() {
       return this.productsRepository.addProducts();
    }
    getProductById(id: string) {
       return this.productsRepository.getProductById(id);
    }
    addNewProduct(product: CreateProductDto, userId: string) {
       return this.productsRepository.addNewProduct(product, userId);
    }

    updateProduct(id: string, editProduct: UpdateProductDto) {
       return this.productsRepository.updateProduct(id, editProduct)
    }
    deleteProduct(id: string, requester: AuthUser) {
       return this.productsRepository. deleteProduct(id, requester)
    }
}
