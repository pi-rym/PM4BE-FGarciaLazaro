import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from './products.interfaces';

@Injectable()
export class ProductsService {
    
    
    
    constructor(private readonly productsRepository: ProductsRepository) {}
    
    getAllProducts() : Products[]{
        return this.productsRepository.getAllProducts();
        
    }
    getProductById(id: string) {
        this.productsRepository.getProductById(id);
    }
    addNewProduct(product: any) {
        this.productsRepository.addNewProduct(product);
    }

    updateProduct(id: string, editProduct: any) {
        this.productsRepository.updateProduct(id, editProduct)
    }
    deleteProduct(id: string) {
        this.productsRepository. deleteProduct(id)
    }
}
