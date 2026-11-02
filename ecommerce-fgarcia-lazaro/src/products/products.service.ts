import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from './products.interfaces';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';

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
    addNewProduct(product: CreateProductDto) {
       return this.productsRepository.addNewProduct(product);
    }

    updateProduct(id: string, editProduct: UpdateProductDto) {
       return this.productsRepository.updateProduct(id, editProduct)
    }
    deleteProduct(id: string) {
       return this.productsRepository. deleteProduct(id)
    }
}
