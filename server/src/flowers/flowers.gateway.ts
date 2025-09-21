import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FlowersService } from './flowers.service';
import { CreateFlowerDto, UpdateFlowerDto } from './dto/flower.dto';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  },
  pingTimeout: 60000,
  pingInterval: 25000,
})
export class FlowersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients = new Map<string, { socket: Socket; lastPing: number }>();

  constructor(private readonly flowersService: FlowersService) {}

  async handleConnection(client: Socket) {
    console.log(`🔌 Client connected: ${client.id}`);
    
    // Track connected client
    this.connectedClients.set(client.id, {
      socket: client,
      lastPing: Date.now(),
    });
    
    // Send initial flowers data to newly connected client
    const flowers = await this.flowersService.findAll();
    client.emit('flowers:init', flowers);
    
    // Send welcome message
    client.emit('server:message', {
      type: 'welcome',
      message: 'Connected to Flowers Shop WebSocket server',
      timestamp: Date.now(),
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Client disconnected: ${client.id}`);
    
    // Remove client from tracking
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('flowers:create')
  async handleCreate(@MessageBody() data: CreateFlowerDto) {
    try {
      const flower = await this.flowersService.create(data);
      this.server.emit('flowers:created', flower);
      return { success: true, data: flower };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('flowers:update')
  async handleUpdate(@MessageBody() data: { id: string; updateData: UpdateFlowerDto }) {
    try {
      const flower = await this.flowersService.update(data.id, data.updateData);
      this.server.emit('flowers:updated', flower);
      return { success: true, data: flower };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('flowers:delete')
  async handleDelete(@MessageBody() id: string) {
    try {
      await this.flowersService.remove(id);
      this.server.emit('flowers:deleted', id);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('flowers:refresh')
  async handleRefresh() {
    try {
      const flowers = await this.flowersService.findAll();
      this.server.emit('flowers:refreshed', flowers);
      return { success: true, data: flowers };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('ping')
  handlePing(client: Socket, timestamp: number) {
    console.log(`🏓 Received ping from ${client.id}:`, new Date(timestamp).toLocaleTimeString());
    
    // Update client's last ping time
    const clientData = this.connectedClients.get(client.id);
    if (clientData) {
      clientData.lastPing = timestamp;
      this.connectedClients.set(client.id, clientData);
    }
    
    // Send pong response
    client.emit('pong', timestamp);
    
    return { success: true, timestamp };
  }

  @SubscribeMessage('get:status')
  handleGetStatus(client: Socket) {
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

  @SubscribeMessage('get:clients')
  handleGetClients(client: Socket) {
    const clients = Array.from(this.connectedClients.entries()).map(([id, data]) => ({
      id,
      lastPing: data.lastPing,
      connectedAt: Date.now() - (Date.now() - data.lastPing),
    }));
    
    client.emit('server:clients', clients);
    return { success: true, clients };
  }

  // Method to get connection statistics
  getConnectionStats() {
    return {
      totalClients: this.connectedClients.size,
      clients: Array.from(this.connectedClients.keys()),
      serverTime: Date.now(),
    };
  }

  // Method to broadcast server message to all clients
  broadcastServerMessage(message: string, type: string = 'info') {
    this.server.emit('server:message', {
      type,
      message,
      timestamp: Date.now(),
    });
  }

  // Method to check for stale connections
  checkStaleConnections() {
    const now = Date.now();
    const staleTimeout = 10 * 60 * 1000; // 10 minutes
    
    for (const [clientId, clientData] of this.connectedClients.entries()) {
      if (now - clientData.lastPing > staleTimeout) {
        console.log(`⚠️ Stale connection detected: ${clientId}`);
        clientData.socket.disconnect();
        this.connectedClients.delete(clientId);
      }
    }
  }
}
