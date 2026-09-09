import { Body, Controller, Get, Param, Post, Query, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products.interfaces';

 


@Controller('products')
export class ProductsController {
    constructor(private readonly productsService : ProductsService){}

    @Get()
    getAllProducts() : Products[]{
            return this.productsService.getAllProducts() ;
             
        }

    @Get(":id")
    getProductById(@Param("id") id:string){
     this.productsService.getProductById(id)
    }

    @Post()
    addNewProduct(@Body() product: any){
        this.productsService.addNewProduct(product)
    }

    @Put(":id")
    updateProduct(@Param("id") id:string , @Body() editProduct:any){
this.productsService.updateProduct(id, editProduct)
    }
    
    @Delete(":id")
    deleteProduct(@Param("id") id: string){
        this.productsService.deleteProduct(id)
    }
}
