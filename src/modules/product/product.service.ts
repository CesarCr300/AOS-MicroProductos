import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../../base/service.base';
import {
  CreateProductDto,
  FilterProductDto,
  ResponseManyProductDto,
  ResponseProductDto,
  UpdateProductDto,
} from './dtos';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { fromProductToResponseAdapter } from './adapters/from-product-to-response.adapter';
import { fromProductToResponseManyAdapter } from './adapters/from-product-to-response-many.adapter';

@Injectable()
export class ProductService extends ServiceBase<
  {
    name: 'Product';
    type: Product;
  },
  Product,
  ResponseManyProductDto,
  ResponseProductDto,
  FilterProductDto,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(_productRepository: ProductRepository) {
    super(_productRepository, {
      article: 'el',
      resourceName: 'producto',
      requiresValidationInUpdate: true,
      requiresValidationInCreation: true,
      adapterFindAll: fromProductToResponseManyAdapter,
      adapterFindOne: fromProductToResponseAdapter,
      functionToCreateObjectToFindIfTheEntityAlreadyExists: (
        dto: Product | CreateProductDto,
      ) => ({
        name: dto.name,
      }),
    });
  }
}
