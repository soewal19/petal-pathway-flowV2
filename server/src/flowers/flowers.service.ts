import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFlowerDto, UpdateFlowerDto } from './dto/flower.dto';
import { Flower } from '@prisma/client';

@Injectable()
export class FlowersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Flower[]> {
    return this.prisma.flower.findMany({
      include: {
        shop: true,
      },
      orderBy: {
        dateAdded: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<Flower> {
    const flower = await this.prisma.flower.findUnique({
      where: { id },
      include: {
        shop: true,
      },
    });

    if (!flower) {
      throw new NotFoundException(`Flower with ID ${id} not found`);
    }

    return flower;
  }

  async create(createFlowerDto: CreateFlowerDto): Promise<Flower> {
    return this.prisma.flower.create({
      data: createFlowerDto,
      include: {
        shop: true,
      },
    });
  }

  async update(id: string, updateFlowerDto: UpdateFlowerDto): Promise<Flower> {
    const existingFlower = await this.findOne(id);
    
    return this.prisma.flower.update({
      where: { id },
      data: updateFlowerDto,
      include: {
        shop: true,
      },
    });
  }

  async remove(id: string): Promise<Flower> {
    const existingFlower = await this.findOne(id);
    
    return this.prisma.flower.delete({
      where: { id },
      include: {
        shop: true,
      },
    });
  }

  async findByShop(shopId: string): Promise<Flower[]> {
    return this.prisma.flower.findMany({
      where: { shopId },
      include: {
        shop: true,
      },
      orderBy: {
        dateAdded: 'desc',
      },
    });
  }
}
