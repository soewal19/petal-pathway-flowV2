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
exports.FlowersGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const flowers_service_1 = require("./flowers.service");
const flower_dto_1 = require("./dto/flower.dto");
let FlowersGateway = class FlowersGateway {
    constructor(flowersService) {
        this.flowersService = flowersService;
        this.connectedClients = new Map();
    }
    async handleConnection(client) {
        console.log(`🔌 Client connected: ${client.id}`);
        this.connectedClients.set(client.id, {
            socket: client,
            lastPing: Date.now(),
        });
        const flowers = await this.flowersService.findAll();
        client.emit('flowers:init', flowers);
        client.emit('server:message', {
            type: 'welcome',
            message: 'Connected to Flowers Shop WebSocket server',
            timestamp: Date.now(),
        });
    }
    handleDisconnect(client) {
        console.log(`❌ Client disconnected: ${client.id}`);
        this.connectedClients.delete(client.id);
    }
    async handleCreate(data) {
        try {
            const flower = await this.flowersService.create(data);
            this.server.emit('flowers:created', flower);
            return { success: true, data: flower };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async handleUpdate(data) {
        try {
            const flower = await this.flowersService.update(data.id, data.updateData);
            this.server.emit('flowers:updated', flower);
            return { success: true, data: flower };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async handleDelete(id) {
        try {
            await this.flowersService.remove(id);
            this.server.emit('flowers:deleted', id);
            return { success: true };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async handleRefresh() {
        try {
            const flowers = await this.flowersService.findAll();
            this.server.emit('flowers:refreshed', flowers);
            return { success: true, data: flowers };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    handlePing(client, timestamp) {
        console.log(`🏓 Received ping from ${client.id}:`, new Date(timestamp).toLocaleTimeString());
        const clientData = this.connectedClients.get(client.id);
        if (clientData) {
            clientData.lastPing = timestamp;
            this.connectedClients.set(client.id, clientData);
        }
        client.emit('pong', timestamp);
        return { success: true, timestamp };
    }
    handleGetStatus(client) {
        const clientData = this.connectedClients.get(client.id);
        const status = {
            connected: true,
            clientId: client.id,
            lastPing: clientData?.lastPing || null,
            totalClients: this.connectedClients.size,
            serverTime: Date.now(),
        };
        client.emit('server:status', status);
        return status;
    }
    handleGetClients(client) {
        const clients = Array.from(this.connectedClients.entries()).map(([id, data]) => ({
            id,
            lastPing: data.lastPing,
            connectedAt: Date.now() - (Date.now() - data.lastPing),
        }));
        client.emit('server:clients', clients);
        return { success: true, clients };
    }
    getConnectionStats() {
        return {
            totalClients: this.connectedClients.size,
            clients: Array.from(this.connectedClients.keys()),
            serverTime: Date.now(),
        };
    }
    broadcastServerMessage(message, type = 'info') {
        this.server.emit('server:message', {
            type,
            message,
            timestamp: Date.now(),
        });
    }
    checkStaleConnections() {
        const now = Date.now();
        const staleTimeout = 10 * 60 * 1000;
        for (const [clientId, clientData] of this.connectedClients.entries()) {
            if (now - clientData.lastPing > staleTimeout) {
                console.log(`⚠️ Stale connection detected: ${clientId}`);
                clientData.socket.disconnect();
                this.connectedClients.delete(clientId);
            }
        }
    }
};
exports.FlowersGateway = FlowersGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], FlowersGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('flowers:create'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flower_dto_1.CreateFlowerDto]),
    __metadata("design:returntype", Promise)
], FlowersGateway.prototype, "handleCreate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('flowers:update'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FlowersGateway.prototype, "handleUpdate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('flowers:delete'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FlowersGateway.prototype, "handleDelete", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('flowers:refresh'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FlowersGateway.prototype, "handleRefresh", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", void 0)
], FlowersGateway.prototype, "handlePing", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('get:status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], FlowersGateway.prototype, "handleGetStatus", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('get:clients'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], FlowersGateway.prototype, "handleGetClients", null);
exports.FlowersGateway = FlowersGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ['http://localhost:5173', 'http://localhost:3000'],
            credentials: true,
        },
        pingTimeout: 60000,
        pingInterval: 25000,
    }),
    __metadata("design:paramtypes", [flowers_service_1.FlowersService])
], FlowersGateway);
//# sourceMappingURL=flowers.gateway.js.map