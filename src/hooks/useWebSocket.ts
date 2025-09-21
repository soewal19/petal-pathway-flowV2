import { useEffect } from 'react';
import { useFlowersStore } from './useFlowersStore';

export const useWebSocket = () => {
  const { connectSocket, disconnectSocket, isConnected } = useFlowersStore();

  useEffect(() => {
    // Connect to WebSocket when component mounts
    connectSocket();

    // Cleanup on unmount
    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket]);

  return { isConnected };
};
