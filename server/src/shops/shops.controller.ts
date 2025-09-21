import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ShopsService } from './shops.service';
import { CreateShopDto, UpdateShopDto, ShopResponseDto } from './dto/shop.dto';

@ApiTags('shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shop' })
  @ApiResponse({ status: 201, description: 'Shop created successfully', type: ShopResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createShopDto: CreateShopDto): Promise<ShopResponseDto> {
    return this.shopsService.create(createShopDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shops' })
  @ApiResponse({ status: 200, description: 'List of all shops', type: [ShopResponseDto] })
  async findAll(): Promise<ShopResponseDto[]> {
    return this.shopsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shop by ID' })
  @ApiParam({ name: 'id', description: 'Shop ID' })
  @ApiResponse({ status: 200, description: 'Shop found', type: ShopResponseDto })
  @ApiResponse({ status: 404, description: 'Shop not found' })
  async findOne(@Param('id') id: string): Promise<ShopResponseDto> {
    return this.shopsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update shop by ID' })
  @ApiParam({ name: 'id', description: 'Shop ID' })
  @ApiResponse({ status: 200, description: 'Shop updated successfully', type: ShopResponseDto })
  @ApiResponse({ status: 404, description: 'Shop not found' })
  async update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto): Promise<ShopResponseDto> {
    return this.shopsService.update(id, updateShopDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete shop by ID' })
  @ApiParam({ name: 'id', description: 'Shop ID' })
  @ApiResponse({ status: 204, description: 'Shop deleted successfully' })
  @ApiResponse({ status: 404, description: 'Shop not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.shopsService.remove(id);
  }
}
