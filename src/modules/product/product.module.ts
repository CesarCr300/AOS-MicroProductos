import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './product.service';
import { IImageManagerService } from '../../services/interfaces/image-manager.interface.service';
import { ImageManagerS3Service } from '../../services/implementation/image-manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    {
      provide: IImageManagerService,
      useClass: ImageManagerS3Service,
    },
    ProductRepository,
    ProductService,
  ],
})
export class ProductModule {}
