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
exports.FlowerResponseDto = exports.UpdateFlowerDto = exports.CreateFlowerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFlowerDto {
}
exports.CreateFlowerDto = CreateFlowerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rose Bouquet', description: 'Flower name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFlowerDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25.99, description: 'Flower price' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateFlowerDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/images/rose-bouquet.jpg', description: 'Flower image path' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFlowerDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Beautiful pink roses perfect for any romantic occasion', description: 'Flower description' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFlowerDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'shop-id-123', description: 'Shop ID where flower is sold' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFlowerDto.prototype, "shopId", void 0);
class UpdateFlowerDto {
}
exports.UpdateFlowerDto = UpdateFlowerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rose Bouquet', description: 'Flower name', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFlowerDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25.99, description: 'Flower price', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UpdateFlowerDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/images/rose-bouquet.jpg', description: 'Flower image path', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFlowerDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Beautiful pink roses perfect for any romantic occasion', description: 'Flower description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFlowerDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'shop-id-123', description: 'Shop ID where flower is sold', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFlowerDto.prototype, "shopId", void 0);
class FlowerResponseDto {
}
exports.FlowerResponseDto = FlowerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Flower ID', example: '1' }),
    __metadata("design:type", String)
], FlowerResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Flower name', example: 'Red Rose' }),
    __metadata("design:type", String)
], FlowerResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Flower price', example: 25.99 }),
    __metadata("design:type", Number)
], FlowerResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Flower image URL', example: '/images/rose.jpg' }),
    __metadata("design:type", String)
], FlowerResponseDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Flower description', example: 'Beautiful red rose' }),
    __metadata("design:type", String)
], FlowerResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shop ID', example: '1' }),
    __metadata("design:type", String)
], FlowerResponseDto.prototype, "shopId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at', example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], FlowerResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated at', example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], FlowerResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=flower.dto.js.map