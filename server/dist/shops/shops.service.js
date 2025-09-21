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
exports.ShopsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ShopsService = class ShopsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
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
    async findOne(id) {
        const shop = await this.prisma.shop.findUnique({
            where: { id },
            include: {
                flowers: true,
                orders: true,
            },
        });
        if (!shop) {
            throw new common_1.NotFoundException(`Shop with ID ${id} not found`);
        }
        return shop;
    }
    async create(createShopDto) {
        return this.prisma.shop.create({
            data: createShopDto,
            include: {
                flowers: true,
                orders: true,
            },
        });
    }
    async update(id, updateShopDto) {
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
    async remove(id) {
        const existingShop = await this.findOne(id);
        return this.prisma.shop.delete({
            where: { id },
            include: {
                flowers: true,
                orders: true,
            },
        });
    }
};
exports.ShopsService = ShopsService;
exports.ShopsService = ShopsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShopsService);
//# sourceMappingURL=shops.service.js.map