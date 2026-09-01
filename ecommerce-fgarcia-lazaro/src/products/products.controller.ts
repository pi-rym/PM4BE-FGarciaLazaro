import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products.repository';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService : ProductsService){}

    @Get()
    getAllProducts() : Products[]{
            return this.productsService.getAllProducts() ;
             
        }
    
}
