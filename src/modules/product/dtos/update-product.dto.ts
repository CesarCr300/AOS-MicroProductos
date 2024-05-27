import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNumber()
  stock: number;
  @IsNumber()
  weightInGrams: number;
  @IsNumber()
  price: number;
  @IsNumber()
  comparePrice: number;
}
