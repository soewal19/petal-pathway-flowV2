"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FlowersService = class FlowersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.flower.findMany({
            include: {
                shop: true,
            },
            orderBy: {
                dateAdded: 'desc',
            },
        });
    }
    async findOne(id) {
        const flower = await this.prisma.flower.findUnique({
            where: { id },
            include: {
                shop: true,
            },
        });
        if (!flower) {
            throw new common_1.NotFoundException(`Flower with ID ${id} not found`);
        }
        return flower;
    }
    async create(createFlowerDto) {
        return this.prisma.flower.create({
            data: createFlowerDto,
            include: {
                shop: true,
            },
        });
    }
    async update(id, updateFlowerDto) {
        const existingFlower = await this.findOne(id);
        return this.prisma.flower.update({
            where: { id },
            data: updateFlowerDto,
            include: {
                shop: true,
            },
        });
    }
    async remove(id) {
        const existingFlower = await this.findOne(id);
        return this.prisma.flower.delete({
            where: { id },
            include: {
                shop: true,
            },
        });
    }
    async findByShop(shopId) {
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
};
exports.FlowersService = FlowersService;
exports.FlowersService = FlowersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FlowersService);
//# sourceMappingURL=flowers.service.js.map