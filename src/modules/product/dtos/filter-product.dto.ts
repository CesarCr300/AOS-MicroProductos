import { OmitType, PartialType } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export class FilterProductDto extends PartialType(
  OmitType(Product, ['createdBy', 'updatedBy', 'deletedAt']),
) {}
