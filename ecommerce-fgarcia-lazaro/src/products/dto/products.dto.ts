import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Max, MaxLength, Min } from 'class-validator';
import { Products } from '../products.interfaces';

export class CreateProductDto implements Omit<Products, 'id' | 'imgUrl'> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(99999999.99)
  price!: number;

  @IsInt()
  @Min(0)
  stock!: number;

  @IsOptional()
  @IsUrl()
  imgUrl?: string;
}

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['name'] as const),
) {}
