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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shops_service_1 = require("./shops.service");
const shop_dto_1 = require("./dto/shop.dto");
let ShopsController = class ShopsController {
    constructor(shopsService) {
        this.shopsService = shopsService;
    }
    async create(createShopDto) {
        return this.shopsService.create(createShopDto);
    }
    async findAll() {
        return this.shopsService.findAll();
    }
    async findOne(id) {
        return this.shopsService.findOne(id);
    }
    async update(id, updateShopDto) {
        return this.shopsService.update(id, updateShopDto);
    }
    async remove(id) {
        await this.shopsService.remove(id);
    }
};
exports.ShopsController = ShopsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new shop' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Shop created successfully', type: shop_dto_1.ShopResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shop_dto_1.CreateShopDto]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all shops' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all shops', type: [shop_dto_1.ShopResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get shop by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Shop ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Shop found', type: shop_dto_1.ShopResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Shop not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update shop by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Shop ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Shop updated successfully', type: shop_dto_1.ShopResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Shop not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, shop_dto_1.UpdateShopDto]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete shop by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Shop ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Shop deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Shop not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShopsController.prototype, "remove", null);
exports.ShopsController = ShopsController = __decorate([
    (0, swagger_1.ApiTags)('shops'),
    (0, common_1.Controller)('shops'),
    __metadata("design:paramtypes", [shops_service_1.ShopsService])
], ShopsController);
//# sourceMappingURL=shops.controller.js.map