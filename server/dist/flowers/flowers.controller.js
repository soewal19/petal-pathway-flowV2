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
exports.FlowersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const flowers_service_1 = require("./flowers.service");
const flower_dto_1 = require("./dto/flower.dto");
let FlowersController = class FlowersController {
    constructor(flowersService) {
        this.flowersService = flowersService;
    }
    async create(createFlowerDto) {
        return this.flowersService.create(createFlowerDto);
    }
    async findAll() {
        return this.flowersService.findAll();
    }
    async findOne(id) {
        return this.flowersService.findOne(id);
    }
    async findByShop(shopId) {
        return this.flowersService.findByShop(shopId);
    }
    async update(id, updateFlowerDto) {
        return this.flowersService.update(id, updateFlowerDto);
    }
    async remove(id) {
        await this.flowersService.remove(id);
    }
};
exports.FlowersController = FlowersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new flower' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Flower created successfully', type: flower_dto_1.FlowerResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flower_dto_1.CreateFlowerDto]),
    __metadata("design:returntype", Promise)
], FlowersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all flowers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all flowers', type: [flower_dto_1.FlowerResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FlowersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get flower by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Flower ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Flower found', type: flower_dto_1.FlowerResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Flower not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FlowersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('shop/:shopId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get flowers by shop ID' }),
    (0, swagger_1.ApiParam)({ name: 'shopId', description: 'Shop ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of flowers from specific shop', type: [flower_dto_1.FlowerResponseDto] }),
    __param(0, (0, common_1.Param)('shopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FlowersController.prototype, "findByShop", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update flower by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Flower ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Flower updated successfully', type: flower_dto_1.FlowerResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Flower not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, flower_dto_1.UpdateFlowerDto]),
    __metadata("design:returntype", Promise)
], FlowersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete flower by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Flower ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Flower deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Flower not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FlowersController.prototype, "remove", null);
exports.FlowersController = FlowersController = __decorate([
    (0, swagger_1.ApiTags)('flowers'),
    (0, common_1.Controller)('flowers'),
    __metadata("design:paramtypes", [flowers_service_1.FlowersService])
], FlowersController);
//# sourceMappingURL=flowers.controller.js.map