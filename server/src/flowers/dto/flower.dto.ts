import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateFlowerDto {
  @ApiProperty({ example: 'Rose Bouquet', description: 'Flower name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 25.99, description: 'Flower price' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: '/images/rose-bouquet.jpg', description: 'Flower image path' })
  @IsString()
  image: string;

  @ApiProperty({ example: 'Beautiful pink roses perfect for any romantic occasion', description: 'Flower description' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'shop-id-123', description: 'Shop ID where flower is sold' })
  @IsString()
  shopId: string;
}

export class UpdateFlowerDto {
  @ApiProperty({ example: 'Rose Bouquet', description: 'Flower name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 25.99, description: 'Flower price', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiProperty({ example: '/images/rose-bouquet.jpg', description: 'Flower image path', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: 'Beautiful pink roses perfect for any romantic occasion', description: 'Flower description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'shop-id-123', description: 'Shop ID where flower is sold', required: false })
  @IsOptional()
  @IsString()
  shopId?: string;
}

export class FlowerResponseDto {
  @ApiProperty({ description: 'Flower ID', example: '1' })
  id: string;

  @ApiProperty({ description: 'Flower name', example: 'Red Rose' })
  name: string;

  @ApiProperty({ description: 'Flower price', example: 25.99 })
  price: number;

  @ApiProperty({ description: 'Flower image URL', example: '/images/rose.jpg' })
  image: string;

  @ApiProperty({ description: 'Flower description', example: 'Beautiful red rose' })
  description: string;

  @ApiProperty({ description: 'Shop ID', example: '1' })
  shopId: string;

  @ApiProperty({ description: 'Created at', example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at', example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
