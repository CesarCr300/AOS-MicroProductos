import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductService } from './product.service';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from './dtos';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() filter: FilterProductDto) {
    return this.productsService.findAll(filter);
  }

  @Get(':id')
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
