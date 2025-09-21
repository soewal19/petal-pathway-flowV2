import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShopDto, UpdateShopDto } from './dto/shop.dto';
import { Shop } from '@prisma/client';

@Injectable()
export class ShopsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Shop[]> {
    return this.prisma.shop.findMany({
      include: {
        flowers: true,
        orders: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<Shop> {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
      include: {
        flowers: true,
        orders: true,
      },
    });

    if (!shop) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }

    return shop;
  }

  async create(createShopDto: CreateShopDto): Promise<Shop> {
    return this.prisma.shop.create({
      data: createShopDto,
      include: {
        flowers: true,
        orders: true,
      },
    });
  }

  async update(id: string, updateShopDto: UpdateShopDto): Promise<Shop> {
    const existingShop = await this.findOne(id);
    
    return this.prisma.shop.update({
      where: { id },
      data: updateShopDto,
      include: {
        flowers: true,
        orders: true,
      },
    });
  }

  async remove(id: string): Promise<Shop> {
    const existingShop = await this.findOne(id);
    
    return this.prisma.shop.delete({
      where: { id },
      include: {
        flowers: true,
        orders: true,
      },
    });
  }
}
