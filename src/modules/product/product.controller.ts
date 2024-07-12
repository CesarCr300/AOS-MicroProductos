import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { ProductService } from './product.service';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from './dtos';
import { Public } from '../auth/utils/isPublic';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create product',
    type: CreateProductDto,
  })
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    createProductDto.file = file;
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Public()
  findAll(@Query() filter: FilterProductDto) {
    return this.productsService.findAll(filter);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: number) {
    return this.productsService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
