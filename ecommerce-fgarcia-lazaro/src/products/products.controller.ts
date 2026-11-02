import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products.interfaces';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';

 


@Controller('products')
export class ProductsController {
    constructor(private readonly productsService : ProductsService){}

    @Get()
    getAllProducts(@Query("page") page?: string, @Query("limit") limit?: string) : Promise<Products[]>{
        const pageNumber = Number(page)
        const limitNumber = Number(limit)

        const validPage = !isNaN(pageNumber) && pageNumber > 0 ? pageNumber : 1;
        const validLimit = !isNaN(limitNumber) && limitNumber > 0 ? limitNumber : 5 ;

        return this.productsService.getAllProducts(validPage, validLimit) ;

        }
   @Get('seeder')
    addProducts() {
      return this.productsService.addProducts();
    }

    @Get(":id")
    getProductById(@Param("id", ParseUUIDPipe) id:string){
    return this.productsService.getProductById(id)
    }

    @Post()
    addNewProduct(@Body() product: CreateProductDto){
      return  this.productsService.addNewProduct(product)
    }

    @Put(":id")
    updateProduct(@Param("id", ParseUUIDPipe) id:string , @Body() editProduct: UpdateProductDto){
 return this.productsService.updateProduct(id, editProduct)
    }
    
    @Delete(":id")
    deleteProduct(@Param("id", ParseUUIDPipe) id: string){
      return  this.productsService.deleteProduct(id)
    }
}
