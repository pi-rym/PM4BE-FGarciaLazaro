import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
// "import type" porque es solo un tipo y se usa en un parámetro con decorador (lo pide isolatedModules):
import type { AuthRequest } from 'src/auth/interfaces/auth-request.interface';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
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
    @UseGuards(AuthGuard)
    addNewProduct(@Body() product: CreateProductDto, @Req() request: AuthRequest){
      return  this.productsService.addNewProduct(product, request.user.id)
    }

    @Put(":id")
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    updateProduct(@Param("id", ParseUUIDPipe) id:string , @Body() editProduct: UpdateProductDto){
 return this.productsService.updateProduct(id, editProduct)
    }
    
    @Delete(":id")
    @UseGuards(AuthGuard)
    deleteProduct(@Param("id", ParseUUIDPipe) id: string, @Req() request: AuthRequest){
      return  this.productsService.deleteProduct(id, request.user)
    }
}
