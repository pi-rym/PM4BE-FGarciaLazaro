import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    findAll(){
        console.log("llamando a get /products")
        
    }
}
