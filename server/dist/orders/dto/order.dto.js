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
exports.OrderResponseDto = exports.CreateOrderDto = exports.CustomerInfoDto = exports.OrderItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class OrderItemDto {
}
exports.OrderItemDto = OrderItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'flower-id-123', description: 'Flower ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "flowerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Quantity' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25.99, description: 'Price per item' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "price", void 0);
class CustomerInfoDto {
}
exports.CustomerInfoDto = CustomerInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Customer name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerInfoDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john@example.com', description: 'Customer email' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CustomerInfoDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+1 (555) 123-4567', description: 'Customer phone' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerInfoDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Main St, City, State', description: 'Customer address' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerInfoDto.prototype, "address", void 0);
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [OrderItemDto], description: 'Order items' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CustomerInfoDto, description: 'Customer information' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CustomerInfoDto),
    __metadata("design:type", CustomerInfoDto)
], CreateOrderDto.prototype, "customerInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 51.98, description: 'Total order amount' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60.00, description: 'Original total before discount', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "originalTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8.02, description: 'Discount amount', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "discountAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'shop-id-123', description: 'Shop ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "shopId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'coupon-id-123', description: 'Applied coupon ID', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "couponId", void 0);
class OrderResponseDto {
}
exports.OrderResponseDto = OrderResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order ID', example: '1' }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Customer name', example: 'John Doe' }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "customerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Customer email', example: 'john@example.com' }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "customerEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Customer phone', example: '+1-555-123-4567' }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "customerPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Customer address', example: '123 Main St' }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "customerAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order total', example: 25.99 }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Original total before discount', example: 30.00, required: false }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "originalTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Discount amount', example: 4.01, required: false }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "discountAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shop ID', example: '1' }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "shopId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Coupon ID', example: '1', required: false }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "couponId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at', example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], OrderResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated at', example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], OrderResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=order.dto.js.map