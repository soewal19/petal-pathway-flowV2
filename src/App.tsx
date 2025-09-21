import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { useWebSocket } from "@/hooks/useWebSocket";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import OrderDetails from "./pages/OrderDetails";
import History from "./pages/History";
import Coupons from "./pages/Coupons";
import NotFound from "./pages/NotFound";
import FlowerManagement from "./components/FlowerManagement";
import WebSocketMonitor from "./pages/WebSocketMonitor";

const queryClient = new QueryClient();

const AppContent = () => {
  // Initialize WebSocket connection
  const { isConnected } = useWebSocket();

  return (
    <TooltipProvider>
      <CartProvider>
        <FavoritesProvider>
          <Toaster />
          <Sonner />
          {/* WebSocket connection status indicator */}
          {isConnected && (
            <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
              🔌 Connected
            </div>
          )}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route element={<Layout />}>
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/history" element={<History />} />
                <Route path="/coupons" element={<Coupons />} />
                <Route path="/order/:orderId" element={<OrderDetails />} />
                <Route path="/admin/flowers" element={<FlowerManagement />} />
                <Route path="/admin/websocket" element={<WebSocketMonitor />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </TooltipProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
);

export default App;
