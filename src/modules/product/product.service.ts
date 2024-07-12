import { HttpException, Inject, Injectable } from '@nestjs/common';

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
import {
  fromProductToResponseAdapter,
  fromProductToResponseManyAdapter,
} from './adapters';
import { IImageManagerService } from '../../services/interfaces/image-manager.interface.service';
import { ManagedUpload } from 'aws-sdk/clients/s3';

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
  constructor(
    _productRepository: ProductRepository,
    @Inject(IImageManagerService)
    private readonly imageManagerService: IImageManagerService,
  ) {
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

  async create(dto: CreateProductDto): Promise<Product> {
    let imageKey: ManagedUpload.SendData;

    try {
      imageKey = await this.imageManagerService.uploadImage(dto.file);
      dto.imageKey = imageKey.Key;
    } catch (error) {
      throw new HttpException('Hubo un error al subir la imagen', 500);
    }

    try {
      const response = super.create(dto);
      return response;
    } catch (error) {
      this.imageManagerService.deleteImage();
      throw error;
    }
  }
}
