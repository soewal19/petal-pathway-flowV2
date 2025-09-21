import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully', type: OrderResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of all orders', type: [OrderResponseDto] })
  async findAll(): Promise<OrderResponseDto[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order found', type: OrderResponseDto })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async findOne(@Param('id') id: string): Promise<OrderResponseDto> {
    return this.ordersService.findOne(id);
  }

  @Get('customer/:email')
  @ApiOperation({ summary: 'Get orders by customer email' })
  @ApiParam({ name: 'email', description: 'Customer email' })
  @ApiResponse({ status: 200, description: 'List of customer orders', type: [OrderResponseDto] })
  async findByCustomer(@Param('email') email: string): Promise<OrderResponseDto[]> {
    return this.ordersService.findByCustomer(email);
  }

  @Get('shop/:shopId')
  @ApiOperation({ summary: 'Get orders by shop ID' })
  @ApiParam({ name: 'shopId', description: 'Shop ID' })
  @ApiResponse({ status: 200, description: 'List of shop orders', type: [OrderResponseDto] })
  async findByShop(@Param('shopId') shopId: string): Promise<OrderResponseDto[]> {
    return this.ordersService.findByShop(shopId);
  }
}
