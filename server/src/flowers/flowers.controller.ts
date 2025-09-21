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
import { FlowersService } from './flowers.service';
import { CreateFlowerDto, UpdateFlowerDto, FlowerResponseDto } from './dto/flower.dto';

@ApiTags('flowers')
@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new flower' })
  @ApiResponse({ status: 201, description: 'Flower created successfully', type: FlowerResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createFlowerDto: CreateFlowerDto): Promise<FlowerResponseDto> {
    return this.flowersService.create(createFlowerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all flowers' })
  @ApiResponse({ status: 200, description: 'List of all flowers', type: [FlowerResponseDto] })
  async findAll(): Promise<FlowerResponseDto[]> {
    return this.flowersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get flower by ID' })
  @ApiParam({ name: 'id', description: 'Flower ID' })
  @ApiResponse({ status: 200, description: 'Flower found', type: FlowerResponseDto })
  @ApiResponse({ status: 404, description: 'Flower not found' })
  async findOne(@Param('id') id: string): Promise<FlowerResponseDto> {
    return this.flowersService.findOne(id);
  }

  @Get('shop/:shopId')
  @ApiOperation({ summary: 'Get flowers by shop ID' })
  @ApiParam({ name: 'shopId', description: 'Shop ID' })
  @ApiResponse({ status: 200, description: 'List of flowers from specific shop', type: [FlowerResponseDto] })
  async findByShop(@Param('shopId') shopId: string): Promise<FlowerResponseDto[]> {
    return this.flowersService.findByShop(shopId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update flower by ID' })
  @ApiParam({ name: 'id', description: 'Flower ID' })
  @ApiResponse({ status: 200, description: 'Flower updated successfully', type: FlowerResponseDto })
  @ApiResponse({ status: 404, description: 'Flower not found' })
  async update(@Param('id') id: string, @Body() updateFlowerDto: UpdateFlowerDto): Promise<FlowerResponseDto> {
    return this.flowersService.update(id, updateFlowerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete flower by ID' })
  @ApiParam({ name: 'id', description: 'Flower ID' })
  @ApiResponse({ status: 204, description: 'Flower deleted successfully' })
  @ApiResponse({ status: 404, description: 'Flower not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.flowersService.remove(id);
  }
}
