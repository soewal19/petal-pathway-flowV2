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
exports.ShopResponseDto = exports.UpdateShopDto = exports.CreateShopDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateShopDto {
}
exports.CreateShopDto = CreateShopDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Flowery Fragrant', description: 'Shop name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateShopDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Garden Street, Bloomville', description: 'Shop location' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateShopDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Garden Street, Bloomville', description: 'Shop address' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateShopDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+1 (555) 123-4567', description: 'Shop phone' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateShopDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9:00 AM - 8:00 PM', description: 'Shop hours' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateShopDto.prototype, "hours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30.5234, description: 'Shop latitude' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateShopDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50.4501, description: 'Shop longitude' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateShopDto.prototype, "longitude", void 0);
class UpdateShopDto {
}
exports.UpdateShopDto = UpdateShopDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Flowery Fragrant', description: 'Shop name', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateShopDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Garden Street, Bloomville', description: 'Shop location', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateShopDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Garden Street, Bloomville', description: 'Shop address', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateShopDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+1 (555) 123-4567', description: 'Shop phone', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateShopDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9:00 AM - 8:00 PM', description: 'Shop hours', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateShopDto.prototype, "hours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30.5234, description: 'Shop latitude', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateShopDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50.4501, description: 'Shop longitude', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateShopDto.prototype, "longitude", void 0);
class ShopResponseDto {
}
exports.ShopResponseDto = ShopResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shop ID', example: '1' }),
    __metadata("design:type", String)
], ShopResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shop name', example: 'Flower Shop' }),
    __metadata("design:type", String)
], ShopResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shop location', example: '123 Main St' }),
    __metadata("design:type", String)
], ShopResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shop address', example: '123 Main St, City' }),
    __metadata("design:type", String)
], ShopResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shop phone', example: '+1-555-123-4567' }),
    __metadata("design:type", String)
], ShopResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shop hours', example: '9:00 AM - 6:00 PM' }),
    __metadata("design:type", String)
], ShopResponseDto.prototype, "hours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shop latitude', example: 40.7128 }),
    __metadata("design:type", Number)
], ShopResponseDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shop longitude', example: -74.0060 }),
    __metadata("design:type", Number)
], ShopResponseDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at', example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], ShopResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated at', example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], ShopResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=shop.dto.js.map