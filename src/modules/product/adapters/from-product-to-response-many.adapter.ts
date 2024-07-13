import { ResponseManyProductDto } from '../dtos';
import { Product } from '../entities/product.entity';

export const fromProductToResponseManyAdapter = (
  product: Product,
  imageUrl: string,
): ResponseManyProductDto => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    imageUrl: imageUrl,
  };
};
