import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/order.dto';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: {
        shop: true,
        coupon: true,
        orderItems: {
          include: {
            flower: true,
          },
        },
      },
      orderBy: {
        orderDate: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        shop: true,
        coupon: true,
        orderItems: {
          include: {
            flower: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { items, ...orderData } = createOrderDto;

    return this.prisma.order.create({
      data: {
        ...orderData,
        customerName: orderData.customerInfo.name,
        customerEmail: orderData.customerInfo.email,
        customerPhone: orderData.customerInfo.phone,
        customerAddress: orderData.customerInfo.address,
        orderItems: {
          create: items.map(item => ({
            flowerId: item.flowerId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        shop: true,
        coupon: true,
        orderItems: {
          include: {
            flower: true,
          },
        },
      },
    });
  }

  async findByCustomer(email: string): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { customerEmail: email },
      include: {
        shop: true,
        coupon: true,
        orderItems: {
          include: {
            flower: true,
          },
        },
      },
      orderBy: {
        orderDate: 'desc',
      },
    });
  }

  async findByShop(shopId: string): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { shopId },
      include: {
        shop: true,
        coupon: true,
        orderItems: {
          include: {
            flower: true,
          },
        },
      },
      orderBy: {
        orderDate: 'desc',
      },
    });
  }
}
