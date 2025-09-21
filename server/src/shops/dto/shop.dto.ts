import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateShopDto {
  @ApiProperty({ example: 'Flowery Fragrant', description: 'Shop name' })
  @IsString()
  name: string;

  @ApiProperty({ example: '123 Garden Street, Bloomville', description: 'Shop location' })
  @IsString()
  location: string;

  @ApiProperty({ example: '123 Garden Street, Bloomville', description: 'Shop address' })
  @IsString()
  address: string;

  @ApiProperty({ example: '+1 (555) 123-4567', description: 'Shop phone' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '9:00 AM - 8:00 PM', description: 'Shop hours' })
  @IsString()
  hours: string;

  @ApiProperty({ example: 30.5234, description: 'Shop latitude' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 50.4501, description: 'Shop longitude' })
  @IsNumber()
  longitude: number;
}

export class UpdateShopDto {
  @ApiProperty({ example: 'Flowery Fragrant', description: 'Shop name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: '123 Garden Street, Bloomville', description: 'Shop location', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: '123 Garden Street, Bloomville', description: 'Shop address', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: '+1 (555) 123-4567', description: 'Shop phone', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: '9:00 AM - 8:00 PM', description: 'Shop hours', required: false })
  @IsOptional()
  @IsString()
  hours?: string;

  @ApiProperty({ example: 30.5234, description: 'Shop latitude', required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ example: 50.4501, description: 'Shop longitude', required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;
}

export class ShopResponseDto {
  @ApiProperty({ description: 'Shop ID', example: '1' })
  id: string;

  @ApiProperty({ description: 'Shop name', example: 'Flower Shop' })
  name: string;

  @ApiProperty({ description: 'Shop location', example: '123 Main St' })
  location: string;

  @ApiProperty({ description: 'Shop address', example: '123 Main St, City' })
  address: string;

  @ApiProperty({ description: 'Shop phone', example: '+1-555-123-4567' })
  phone: string;

  @ApiProperty({ description: 'Shop hours', example: '9:00 AM - 6:00 PM' })
  hours: string;

  @ApiProperty({ description: 'Shop latitude', example: 40.7128 })
  latitude: number;

  @ApiProperty({ description: 'Shop longitude', example: -74.0060 })
  longitude: number;

  @ApiProperty({ description: 'Created at', example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at', example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
