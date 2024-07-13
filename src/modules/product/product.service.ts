import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ManagedUpload } from 'aws-sdk/clients/s3';

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
    private _productRepository: ProductRepository,
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
      this.imageManagerService.deleteImage(imageKey.Key);
      throw error;
    }
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await super.getEntityValidatedToUpdate(id, dto);

    let imageKey: ManagedUpload.SendData;
    try {
      imageKey = await this.imageManagerService.uploadImage(dto.file);
      dto.imageKey = imageKey.Key;
    } catch (error) {
      throw new HttpException('Hubo un error al subir la imagen', 500);
    }
    delete dto.file;

    if (product.imageKey == null) {
      return super.update(id, dto);
    }

    const oldImageKey = product.imageKey;
    try {
      await this._productRepository.update(id, dto);
    } catch (error) {
      this.imageManagerService.deleteImage(imageKey.Key);
      throw error;
    }
    this.imageManagerService.deleteImage(oldImageKey);
    return product;
  }
}
