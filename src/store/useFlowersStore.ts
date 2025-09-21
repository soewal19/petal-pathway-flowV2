import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

// Types
export interface Flower {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  shopId: string;
  dateAdded: string;
  createdAt: string;
  updatedAt: string;
  shop?: {
    id: string;
    name: string;
    location: string;
    address: string;
    phone: string;
    hours: string;
    latitude: number;
    longitude: number;
  };
}

export interface Shop {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  hours: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  total: number;
  originalTotal?: number;
  discountAmount?: number;
  orderDate: string;
  shopId: string;
  couponId?: string;
  createdAt: string;
  updatedAt: string;
  shop?: Shop;
  coupon?: {
    id: string;
    name: string;
    code: string;
    discount: number;
    description?: string;
    isActive: boolean;
  };
  orderItems?: Array<{
    id: string;
    quantity: number;
    price: number;
    flower: Flower;
  }>;
}

export interface CreateFlowerDto {
  name: string;
  price: number;
  image: string;
  description: string;
  shopId: string;
}

export interface UpdateFlowerDto {
  name?: string;
  price?: number;
  image?: string;
  description?: string;
  shopId?: string;
}

// Store interface
interface FlowersStore {
  // State
  flowers: Flower[];
  shops: Shop[];
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  socket: Socket | null;
  isConnected: boolean;
  lastPing: number | null;
  pingInterval: NodeJS.Timeout | null;

  // Actions
  setFlowers: (flowers: Flower[]) => void;
  setShops: (shops: Shop[]) => void;
  setOrders: (orders: Order[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // API calls
  fetchFlowers: () => Promise<void>;
  fetchShops: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  
  // CRUD operations
  createFlower: (flower: CreateFlowerDto) => Promise<void>;
  updateFlower: (id: string, flower: UpdateFlowerDto) => Promise<void>;
  deleteFlower: (id: string) => Promise<void>;
  
  // WebSocket operations
  connectSocket: () => void;
  disconnectSocket: () => void;
  startPingInterval: () => void;
  stopPingInterval: () => void;
  pingSocket: () => void;
  
  // Real-time updates
  addFlower: (flower: Flower) => void;
  updateFlowerInStore: (flower: Flower) => void;
  removeFlower: (id: string) => void;
}

// API base URL
const API_BASE_URL = 'http://localhost:3000';

// Create store
export const useFlowersStore = create<FlowersStore>((set, get) => ({
  // Initial state
  flowers: [],
  shops: [],
  orders: [],
  isLoading: false,
  error: null,
  socket: null,
  isConnected: false,
  lastPing: null,
  pingInterval: null,

  // State setters
  setFlowers: (flowers) => set({ flowers }),
  setShops: (shops) => set({ shops }),
  setOrders: (orders) => set({ orders }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // API calls
  fetchFlowers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/flowers`);
      if (!response.ok) throw new Error('Failed to fetch flowers');
      const flowers = await response.json();
      set({ flowers, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false });
    }
  },

  fetchShops: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/shops`);
      if (!response.ok) throw new Error('Failed to fetch shops');
      const shops = await response.json();
      set({ shops, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false });
    }
  },

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      const orders = await response.json();
      set({ orders, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false });
    }
  },

  // CRUD operations
  createFlower: async (flowerData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/flowers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flowerData),
      });
      if (!response.ok) throw new Error('Failed to create flower');
      const flower = await response.json();
      set({ isLoading: false });
      // The WebSocket will handle adding the flower to the store
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false });
    }
  },

  updateFlower: async (id, flowerData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/flowers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flowerData),
      });
      if (!response.ok) throw new Error('Failed to update flower');
      set({ isLoading: false });
      // The WebSocket will handle updating the flower in the store
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false });
    }
  },

  deleteFlower: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/flowers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete flower');
      set({ isLoading: false });
      // The WebSocket will handle removing the flower from the store
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false });
    }
  },

  // WebSocket operations
  connectSocket: () => {
    const socket = io('http://localhost:3000', {
      transports: ['websocket'],
      timeout: 20000,
      pingTimeout: 60000,
      pingInterval: 25000,
    });

    socket.on('connect', () => {
      console.log('🔌 Connected to WebSocket server');
      set({ isConnected: true });
      
      // Start ping interval after connection
      const { startPingInterval } = get();
      startPingInterval();
    });

    socket.on('disconnect', (reason) => {
      console.log('❌ Disconnected from WebSocket server:', reason);
      set({ isConnected: false });
      
      // Stop ping interval on disconnect
      const { stopPingInterval } = get();
      stopPingInterval();
    });

    socket.on('connect_error', (error) => {
      console.error('🔌 Connection error:', error);
      set({ isConnected: false, error: 'WebSocket connection failed' });
    });

    // Listen for pong responses
    socket.on('pong', (timestamp) => {
      console.log('🏓 Received pong:', new Date(timestamp).toLocaleTimeString());
      set({ lastPing: timestamp });
    });

    // Listen for flower events
    socket.on('flowers:init', (flowers: Flower[]) => {
      console.log('🌸 Received initial flowers:', flowers.length);
      set({ flowers });
    });

    socket.on('flowers:created', (flower: Flower) => {
      console.log('➕ New flower created:', flower.name);
      set((state) => ({ flowers: [...state.flowers, flower] }));
    });

    socket.on('flowers:updated', (flower: Flower) => {
      console.log('✏️ Flower updated:', flower.name);
      set((state) => ({
        flowers: state.flowers.map((f) => (f.id === flower.id ? flower : f)),
      }));
    });

    socket.on('flowers:deleted', (id: string) => {
      console.log('🗑️ Flower deleted:', id);
      set((state) => ({
        flowers: state.flowers.filter((f) => f.id !== id),
      }));
    });

    socket.on('flowers:refreshed', (flowers: Flower[]) => {
      console.log('🔄 Flowers refreshed:', flowers.length);
      set({ flowers });
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const { socket, stopPingInterval } = get();
    if (socket) {
      stopPingInterval();
      socket.disconnect();
      set({ socket: null, isConnected: false, lastPing: null });
    }
  },

  // Ping interval management
  startPingInterval: () => {
    const { pingInterval, stopPingInterval } = get();
    
    // Clear existing interval
    if (pingInterval) {
      stopPingInterval();
    }

    // Start new interval (5 minutes = 300000ms)
    const interval = setInterval(() => {
      const { pingSocket } = get();
      pingSocket();
    }, 5 * 60 * 1000);

    set({ pingInterval: interval });
    console.log('🏓 Started ping interval (every 5 minutes)');
  },

  stopPingInterval: () => {
    const { pingInterval } = get();
    if (pingInterval) {
      clearInterval(pingInterval);
      set({ pingInterval: null });
      console.log('🏓 Stopped ping interval');
    }
  },

  pingSocket: () => {
    const { socket, isConnected } = get();
    
    if (socket && isConnected) {
      const timestamp = Date.now();
      console.log('🏓 Sending ping:', new Date(timestamp).toLocaleTimeString());
      
      socket.emit('ping', timestamp);
      
      // Set a timeout to detect if pong doesn't come back
      setTimeout(() => {
        const { lastPing } = get();
        if (!lastPing || lastPing !== timestamp) {
          console.warn('⚠️ Ping timeout - connection may be unstable');
          set({ error: 'WebSocket connection unstable' });
        }
      }, 10000); // 10 second timeout for pong response
    } else {
      console.warn('⚠️ Cannot ping - socket not connected');
    }
  },

  // Real-time updates (called by WebSocket events)
  addFlower: (flower) => {
    set((state) => ({ flowers: [...state.flowers, flower] }));
  },

  updateFlowerInStore: (flower) => {
    set((state) => ({
      flowers: state.flowers.map((f) => (f.id === flower.id ? flower : f)),
    }));
  },

  removeFlower: (id) => {
    set((state) => ({
      flowers: state.flowers.filter((f) => f.id !== id),
    }));
  },
}));