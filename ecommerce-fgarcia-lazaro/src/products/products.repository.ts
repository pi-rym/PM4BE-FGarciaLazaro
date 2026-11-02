import { allProducts } from 'src/utils/data';
import { Categories } from 'src/categories/entities/categories.entity';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products as ProductEntity } from 'src/products/entities/products.entity';
import { Status } from 'src/common/enums/status.enum';
import { Repository } from 'typeorm';
import { Products } from './products.interfaces';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly ormProductsRepository: Repository<ProductEntity>,
    @InjectRepository(Categories)
    private readonly ormCategoriesRepository: Repository<Categories>,
  ) {}

  verifyProductExist(id: string): Promise<ProductEntity | null> {
    return this.ormProductsRepository.findOne({
      where: { id, status: Status.ENABLE },
      relations: {
        category: true,
      },
    });
  }

  getAllProducts(validPage: number, validLimit: number): Promise<Products[]> {
    return this.ormProductsRepository.find({
      relations: {
        category: true,
      },
      where: { status: Status.ENABLE },
      order: { name: 'ASC' },
      skip: (validPage - 1) * validLimit, 
      take: validLimit, 
    });
  }

  async getProductById(id: string) {
    const productFound = await this.verifyProductExist(id);
    if (!productFound) throw new NotFoundException(`No se encontró el producto: ${id}`);

    return productFound;
  }

  async addNewProduct(product: CreateProductDto) {
    const existingProduct = await this.ormProductsRepository.findOneBy({ name: product.name });
    if (existingProduct) throw new ConflictException(`Ya existe un producto con el nombre: ${product.name}`);

    const newProduct = this.ormProductsRepository.create({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imgUrl: product.imgUrl,
    });

    await this.ormProductsRepository.save(newProduct);
    return `${product.name} añadido`;
  }

  async addProducts(): Promise<string> {
    
    const categories = await this.ormCategoriesRepository.find();
    await Promise.all(
      allProducts.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );
              
        if (!category) throw new ConflictException(
          `La categoría ${element.category} no existe. Ejecuta primero /categories/seeder`);
       
        const product = new ProductEntity();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = category; 
        
        await this.ormProductsRepository
          .createQueryBuilder()
          .insert()
          .into(ProductEntity)
          .values(product)
          
          .orUpdate(['description', 'price'], ['name'])
          .execute();
      }),
    );
    return 'Productos agregados';
  }

  async updateProduct(id: string, editProduct: UpdateProductDto) {
    const productFound = await this.verifyProductExist(id);
    if (!productFound) throw new NotFoundException(`No se encontró el producto: ${id}`);

    Object.assign(productFound, editProduct, { id });
    await this.ormProductsRepository.save(productFound);
    return `Se actualiza el producto con id: ${id}`;
  }

  async deleteProduct(id: string) {
    const productFound = await this.verifyProductExist(id);
    if (!productFound) throw new NotFoundException(`No se encontró el producto: ${id}`);

    await this.ormProductsRepository.update(id, { status: Status.DISABLE });
    return `Se elimina el producto con id: ${id}`;
  }
}
