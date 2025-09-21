import { useEffect, useState } from 'react';
import { useFlowersStore } from '@/store/useFlowersStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, Clock, Users, RefreshCw } from 'lucide-react';

interface ConnectionStatus {
  connected: boolean;
  clientId: string;
  lastPing: number | null;
  totalClients: number;
  serverTime: number;
}

const WebSocketStatus = () => {
  const { 
    socket, 
    isConnected, 
    lastPing, 
    connectSocket, 
    disconnectSocket,
    pingSocket 
  } = useFlowersStore();
  
  const [status, setStatus] = useState<ConnectionStatus | null>(null);
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    if (socket && isConnected) {
      // Request status on connection
      socket.emit('get:status');
      
      // Listen for status updates
      socket.on('server:status', (statusData) => {
        setStatus(statusData);
      });

      // Listen for server messages
      socket.on('server:message', (message) => {
        console.log('📨 Server message:', message);
      });

      // Listen for pong responses
      socket.on('pong', (timestamp) => {
        console.log('🏓 Pong received:', new Date(timestamp).toLocaleTimeString());
      });
    }
  }, [socket, isConnected]);

  const handleGetStatus = () => {
    if (socket && isConnected) {
      socket.emit('get:status');
    }
  };

  const handleGetClients = () => {
    if (socket && isConnected) {
      socket.emit('get:clients');
      socket.on('server:clients', (clientsData) => {
        setClients(clientsData.clients);
      });
    }
  };

  const handleManualPing = () => {
    pingSocket();
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getConnectionDuration = () => {
    if (!status?.serverTime || !status?.lastPing) return 'Unknown';
    const duration = Math.floor((status.serverTime - status.lastPing) / 1000);
    return `${duration}s ago`;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isConnected ? (
            <Wifi className="w-5 h-5 text-green-500" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-500" />
          )}
          WebSocket Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          <Badge variant={isConnected ? "default" : "destructive"}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
        </div>

        {/* Client ID */}
        {status?.clientId && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Client ID:</span>
            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
              {status.clientId.slice(0, 8)}...
            </span>
          </div>
        )}

        {/* Last Ping */}
        {lastPing && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Last Ping:
            </span>
            <span className="text-sm text-gray-600">
              {formatTime(lastPing)}
            </span>
          </div>
        )}

        {/* Total Clients */}
        {status && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <Users className="w-4 h-4" />
              Total Clients:
            </span>
            <Badge variant="secondary">
              {status.totalClients}
            </Badge>
          </div>
        )}

        {/* Server Time */}
        {status?.serverTime && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Server Time:</span>
            <span className="text-sm text-gray-600">
              {formatTime(status.serverTime)}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {!isConnected ? (
            <Button 
              onClick={connectSocket} 
              size="sm" 
              className="flex-1"
            >
              Connect
            </Button>
          ) : (
            <>
              <Button 
                onClick={disconnectSocket} 
                size="sm" 
                variant="outline"
                className="flex-1"
              >
                Disconnect
              </Button>
              <Button 
                onClick={handleManualPing} 
                size="sm" 
                variant="outline"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {/* Additional Info */}
        {isConnected && (
          <div className="space-y-2">
            <Button 
              onClick={handleGetStatus} 
              size="sm" 
              variant="outline" 
              className="w-full"
            >
              Refresh Status
            </Button>
            <Button 
              onClick={handleGetClients} 
              size="sm" 
              variant="outline" 
              className="w-full"
            >
              Get Clients
            </Button>
          </div>
        )}

        {/* Clients List */}
        {clients.length > 0 && (
          <div className="pt-2 border-t">
            <h4 className="text-sm font-medium mb-2">Connected Clients:</h4>
            <div className="space-y-1">
              {clients.map((client) => (
                <div key={client.id} className="flex justify-between text-xs">
                  <span className="font-mono">{client.id.slice(0, 8)}...</span>
                  <span className="text-gray-500">
                    {formatTime(client.lastPing)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Auto-ping Info */}
        {isConnected && (
          <div className="text-xs text-gray-500 pt-2 border-t">
            <p>🔄 Auto-ping every 5 minutes</p>
            <p>🏓 Manual ping available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WebSocketStatus;

