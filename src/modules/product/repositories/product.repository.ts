import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { RepositoryBase } from '../../../base/repository.base';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from '../dtos';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductRepository extends RepositoryBase<
  {
    name: 'Product';
    type: Product;
  },
  Product,
  FilterProductDto,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(dataSource: DataSource) {
    super(dataSource, {
      name: 'Product',
      type: new Product(),
    });
  }
}
