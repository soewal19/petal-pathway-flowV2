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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async create(createOrderDto) {
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
    async findByCustomer(email) {
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
    async findByShop(shopId) {
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
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map