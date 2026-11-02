import { ArrayMinSize, IsArray, IsNotEmpty, IsObject, IsOptional, IsUUID } from 'class-validator';
import { Products } from 'src/products/entities/products.entity';

export class CreateOrderDto {
  @IsNotEmpty({message: "userId es obligatorio"})
  @IsUUID('all', {message: "userId debe tener formato UUID"})
  userId!: string;

  @IsArray({message: "products debe ser un array"})
  @ArrayMinSize(1, {message: "products debe tener al menos un producto"})
  @IsObject({each: true, message: "Cada producto debe ser un objeto"})
  products!: Partial<Products>[];
}

export class UpdateOrderDto {
  @IsOptional()
  @IsNotEmpty({message: "userId es obligatorio"})
  @IsUUID('all', {message: "userId debe tener formato UUID"})
  userId?: string;

  @IsOptional()
  @IsArray({message: "products debe ser un array"})
  @ArrayMinSize(1, {message: "products debe tener al menos un producto"})
  @IsObject({each: true, message: "Cada producto debe ser un objeto"})
  products?: Partial<Products>[];
}
