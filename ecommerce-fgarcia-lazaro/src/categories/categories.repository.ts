import { allProducts } from 'src/utils/data';
import { Categories } from 'src/categories/entities/categories.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private ormCategoriesRepository: Repository<Categories>,
  ) {}

  async getAllCategories(): Promise<Categories[]> {
    return await this.ormCategoriesRepository.find();
  }

  async addCategories(): Promise<string> {
    // Creamos un array de promesas
    const insertPromises = allProducts.map((element) =>
      this.ormCategoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: element.category })
        .orIgnore()
        .execute(),
    );

    // Esperamos a que todas terminen antes de seguir:
    await Promise.all(insertPromises);

    return 'Categorías agregadas';
  }
}