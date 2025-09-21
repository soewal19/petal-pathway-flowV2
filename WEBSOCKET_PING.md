# 🏓 WebSocket Ping System

This document describes the WebSocket ping/pong system implemented in the Flowers Shop application for maintaining stable connections.

## 📋 Overview

The WebSocket ping system ensures reliable real-time communication between the frontend and backend by:

- **Automatic pinging** every 5 minutes
- **Manual ping capability** for testing
- **Connection monitoring** and stale connection detection
- **Real-time status tracking** of all connected clients

## 🔧 Implementation

### Frontend (Client-side)

#### Zustand Store Integration
The ping system is integrated into the main Zustand store (`useFlowersStore.ts`):

```typescript
interface FlowersStore {
  // Ping-related state
  lastPing: number | null;
  pingInterval: NodeJS.Timeout | null;
  
  // Ping methods
  startPingInterval: () => void;
  stopPingInterval: () => void;
  pingSocket: () => void;
}
```

#### Automatic Ping Setup
```typescript
// Start ping interval (5 minutes = 300000ms)
startPingInterval: () => {
  const interval = setInterval(() => {
    const { pingSocket } = get();
    pingSocket();
  }, 5 * 60 * 1000);
  
  set({ pingInterval: interval });
}
```

#### Manual Ping
```typescript
pingSocket: () => {
  const { socket, isConnected } = get();
  
  if (socket && isConnected) {
    const timestamp = Date.now();
    socket.emit('ping', timestamp);
    
    // Set timeout to detect if pong doesn't come back
    setTimeout(() => {
      const { lastPing } = get();
      if (!lastPing || lastPing !== timestamp) {
        console.warn('⚠️ Ping timeout - connection may be unstable');
        set({ error: 'WebSocket connection unstable' });
      }
    }, 10000); // 10 second timeout
  }
}
```

### Backend (Server-side)

#### WebSocket Gateway Configuration
```typescript
@WebSocketGateway({
  cors: { origin: ['http://localhost:5173', 'http://localhost:3000'] },
  pingTimeout: 60000,    // 60 seconds
  pingInterval: 25000,   // 25 seconds
})
```

#### Ping Handler
```typescript
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
```

#### Client Tracking
```typescript
private connectedClients = new Map<string, { socket: Socket; lastPing: number }>();

async handleConnection(client: Socket) {
  // Track connected client
  this.connectedClients.set(client.id, {
    socket: client,
    lastPing: Date.now(),
  });
}
```

## 🎯 Features

### 1. Automatic Ping
- **Interval**: Every 5 minutes
- **Purpose**: Keep connection alive
- **Timeout**: 10 seconds for pong response

### 2. Manual Ping
- **Trigger**: User-initiated via UI
- **Purpose**: Test connection stability
- **Feedback**: Immediate response in UI

### 3. Connection Monitoring
- **Client tracking**: All connected clients monitored
- **Last ping tracking**: Timestamp of last successful ping
- **Stale connection detection**: Automatic cleanup of inactive connections

### 4. Status Reporting
- **Real-time status**: Connection state and statistics
- **Client list**: All connected clients with their ping times
- **Server statistics**: Total clients and server time

## 🖥️ User Interface

### WebSocket Status Component
Located in `/admin/websocket`, provides:

- **Connection status** indicator
- **Client ID** display
- **Last ping** timestamp
- **Total clients** count
- **Manual ping** button
- **Connection controls** (connect/disconnect)

### WebSocket Monitor Page
Full monitoring dashboard with:

- **Server statistics** overview
- **Connected clients** list
- **Message log** with ping/pong events
- **Connection information** panel

## 📊 Monitoring

### Client-side Monitoring
```typescript
// Listen for pong responses
socket.on('pong', (timestamp) => {
  console.log('🏓 Pong received:', new Date(timestamp).toLocaleTimeString());
  set({ lastPing: timestamp });
});
```

### Server-side Monitoring
```typescript
// Check for stale connections
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
```

## 🔄 Message Flow

### Ping Message Flow
```
Client                    Server
  |                         |
  |-- ping (timestamp) ---->|
  |                         |-- Update lastPing
  |                         |-- Log ping received
  |<-- pong (timestamp) ----|
  |                         |
  |-- Update lastPing       |
  |-- Log pong received     |
```

### Status Request Flow
```
Client                    Server
  |                         |
  |-- get:status ---------->|
  |                         |-- Get client data
  |                         |-- Calculate statistics
  |<-- server:status -------|
  |                         |
  |-- Update UI with status |
```

## ⚙️ Configuration

### Timeouts and Intervals
- **Ping Interval**: 5 minutes (300,000ms)
- **Pong Timeout**: 10 seconds
- **Connection Timeout**: 20 seconds
- **Stale Connection Check**: 10 minutes
- **Socket.IO Ping Interval**: 25 seconds
- **Socket.IO Ping Timeout**: 60 seconds

### Environment Variables
```env
# WebSocket configuration
WS_PING_INTERVAL=300000    # 5 minutes
WS_PONG_TIMEOUT=10000      # 10 seconds
WS_STALE_TIMEOUT=600000    # 10 minutes
```

## 🚨 Troubleshooting

### Common Issues

1. **Ping timeout errors**
   - Check network connectivity
   - Verify server is running
   - Check firewall settings

2. **Stale connections**
   - Server automatically cleans up stale connections
   - Check client reconnection logic

3. **High ping latency**
   - Monitor network performance
   - Check server load
   - Consider adjusting ping intervals

### Debug Commands

```bash
# Check WebSocket connection
curl -i -N -H "Connection: Upgrade" -H "Upgrade: websocket" -H "Sec-WebSocket-Key: test" -H "Sec-WebSocket-Version: 13" http://localhost:3000/socket.io/

# Monitor server logs
cd server && npm run start:dev
```

## 📈 Performance Considerations

### Optimization Tips
- **Batch pings**: Group multiple clients for efficiency
- **Adaptive intervals**: Adjust ping frequency based on connection stability
- **Connection pooling**: Reuse connections when possible
- **Memory management**: Clean up disconnected clients promptly

### Metrics to Monitor
- **Ping success rate**: Percentage of successful pings
- **Average ping latency**: Time between ping and pong
- **Connection duration**: How long clients stay connected
- **Stale connection rate**: Frequency of stale connections

## 🔒 Security Considerations

- **Rate limiting**: Prevent ping flooding
- **Authentication**: Verify client identity
- **Input validation**: Validate ping timestamps
- **Resource limits**: Prevent resource exhaustion

---

**For more information, check the main README.md and API.md files.**

