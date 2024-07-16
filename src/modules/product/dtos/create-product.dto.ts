import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNumberString()
  stock: number;
  @IsNumberString()
  price: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  imageKey: string;
}
