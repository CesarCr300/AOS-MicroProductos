import { ResponseProductDto } from '../dtos';
import { Product } from '../entities/product.entity';

export const fromProductToResponseAdapter = (
  product: Product,
  imageUrl: string,
): ResponseProductDto => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    imageUrl,
  };
};
