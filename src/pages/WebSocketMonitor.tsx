import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFlowersStore } from '@/store/useFlowersStore';
import WebSocketStatus from '@/components/WebSocketStatus';
import { Wifi, Users, Clock, Activity, RefreshCw } from 'lucide-react';

interface ClientInfo {
  id: string;
  lastPing: number;
  connectedAt: number;
}

const WebSocketMonitor = () => {
  const { 
    socket, 
    isConnected, 
    lastPing, 
    connectSocket, 
    disconnectSocket,
    pingSocket 
  } = useFlowersStore();
  
  const [clients, setClients] = useState<ClientInfo[]>([]);
  const [serverStats, setServerStats] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (socket && isConnected) {
      // Listen for server messages
      socket.on('server:message', (message) => {
        setMessages(prev => [...prev.slice(-9), {
          ...message,
          id: Date.now(),
        }]);
      });

      // Listen for pong responses
      socket.on('pong', (timestamp) => {
        setMessages(prev => [...prev.slice(-9), {
          id: Date.now(),
          type: 'pong',
          message: `Pong received at ${new Date(timestamp).toLocaleTimeString()}`,
          timestamp,
        }]);
      });

      // Listen for clients list
      socket.on('server:clients', (data) => {
        setClients(data.clients);
      });

      // Listen for server status
      socket.on('server:status', (status) => {
        setServerStats(status);
      });
    }
  }, [socket, isConnected]);

  const handleGetClients = () => {
    if (socket && isConnected) {
      socket.emit('get:clients');
    }
  };

  const handleGetStatus = () => {
    if (socket && isConnected) {
      socket.emit('get:status');
    }
  };

  const handleManualPing = () => {
    pingSocket();
    setMessages(prev => [...prev.slice(-9), {
      id: Date.now(),
      type: 'ping',
      message: `Manual ping sent at ${new Date().toLocaleTimeString()}`,
      timestamp: Date.now(),
    }]);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'ping': return 'bg-blue-100 text-blue-800';
      case 'pong': return 'bg-green-100 text-green-800';
      case 'welcome': return 'bg-purple-100 text-purple-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">WebSocket Monitor</h1>
        <p className="text-gray-600">
          Monitor WebSocket connections, ping status, and real-time communication
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* WebSocket Status */}
        <div className="lg:col-span-1">
          <WebSocketStatus />
        </div>

        {/* Server Statistics */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Server Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {serverStats?.totalClients || 0}
                  </div>
                  <div className="text-sm text-gray-600">Connected Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {lastPing ? '🟢' : '🔴'}
                  </div>
                  <div className="text-sm text-gray-600">Ping Status</div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button onClick={handleGetStatus} size="sm" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Get Status
                </Button>
                <Button onClick={handleGetClients} size="sm" variant="outline">
                  <Users className="w-4 h-4 mr-1" />
                  Get Clients
                </Button>
                <Button onClick={handleManualPing} size="sm" variant="outline">
                  <Clock className="w-4 h-4 mr-1" />
                  Manual Ping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connected Clients */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Connected Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              {clients.length > 0 ? (
                <div className="space-y-2">
                  {clients.map((client) => (
                    <div key={client.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-mono text-sm">
                          {client.id.slice(0, 8)}...
                        </div>
                        <div className="text-xs text-gray-500">
                          Last ping: {formatTime(client.lastPing)}
                        </div>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No clients connected
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Message Log */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Message Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div key={message.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <Badge className={getMessageTypeColor(message.type)}>
                        {message.type}
                      </Badge>
                      <span className="text-sm flex-1">{message.message}</span>
                      <span className="text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    No messages yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Connection Info */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Connection Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Auto-ping Interval:</strong> Every 5 minutes
              </div>
              <div>
                <strong>Ping Timeout:</strong> 10 seconds
              </div>
              <div>
                <strong>Connection Timeout:</strong> 20 seconds
              </div>
              <div>
                <strong>Stale Connection Check:</strong> Every 10 minutes
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebSocketMonitor;

