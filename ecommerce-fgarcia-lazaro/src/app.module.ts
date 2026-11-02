import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [ ConfigModule.forRoot({isGlobal: true, load: [typeOrmConfig]}), TypeOrmModule.forRootAsync({inject: [ConfigService], useFactory: (configService: ConfigService)=> configService.get("typeorm")!}), ProductsModule, UsersModule, AuthModule, OrderModule, CategoriesModule, FileUploadModule],
  controllers: [AppController],
  providers: [AppService]
  
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly categoriesService :CategoriesService, private readonly productsService: ProductsService){}
 async onApplicationBootstrap() {
    await  this.categoriesService.addCategories()
        console.log("Categorias cargadas")
    await this.productsService.addProducts()
       console.log("Productos cargados")
  }
}
