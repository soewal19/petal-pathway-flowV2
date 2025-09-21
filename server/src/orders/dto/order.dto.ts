import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEmail, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @ApiProperty({ example: 'flower-id-123', description: 'Flower ID' })
  @IsString()
  flowerId: string;

  @ApiProperty({ example: 2, description: 'Quantity' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 25.99, description: 'Price per item' })
  @IsNumber()
  price: number;
}

export class CustomerInfoDto {
  @ApiProperty({ example: 'John Doe', description: 'Customer name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Customer email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+1 (555) 123-4567', description: 'Customer phone' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '123 Main St, City, State', description: 'Customer address' })
  @IsString()
  address: string;
}

export class CreateOrderDto {
  @ApiProperty({ type: [OrderItemDto], description: 'Order items' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({ type: CustomerInfoDto, description: 'Customer information' })
  @ValidateNested()
  @Type(() => CustomerInfoDto)
  customerInfo: CustomerInfoDto;

  @ApiProperty({ example: 51.98, description: 'Total order amount' })
  @IsNumber()
  total: number;

  @ApiProperty({ example: 60.00, description: 'Original total before discount', required: false })
  @IsOptional()
  @IsNumber()
  originalTotal?: number;

  @ApiProperty({ example: 8.02, description: 'Discount amount', required: false })
  @IsOptional()
  @IsNumber()
  discountAmount?: number;

  @ApiProperty({ example: 'shop-id-123', description: 'Shop ID' })
  @IsString()
  shopId: string;

  @ApiProperty({ example: 'coupon-id-123', description: 'Applied coupon ID', required: false })
  @IsOptional()
  @IsString()
  couponId?: string;
}

export class OrderResponseDto {
  @ApiProperty({ description: 'Order ID', example: '1' })
  id: string;

  @ApiProperty({ description: 'Customer name', example: 'John Doe' })
  customerName: string;

  @ApiProperty({ description: 'Customer email', example: 'john@example.com' })
  customerEmail: string;

  @ApiProperty({ description: 'Customer phone', example: '+1-555-123-4567' })
  customerPhone: string;

  @ApiProperty({ description: 'Customer address', example: '123 Main St' })
  customerAddress: string;

  @ApiProperty({ description: 'Order total', example: 25.99 })
  total: number;

  @ApiProperty({ description: 'Original total before discount', example: 30.00, required: false })
  originalTotal?: number;

  @ApiProperty({ description: 'Discount amount', example: 4.01, required: false })
  discountAmount?: number;

  @ApiProperty({ description: 'Shop ID', example: '1' })
  shopId: string;

  @ApiProperty({ description: 'Coupon ID', example: '1', required: false })
  couponId?: string;

  @ApiProperty({ description: 'Created at', example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at', example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
