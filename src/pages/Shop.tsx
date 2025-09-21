import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import FlowerCard from '@/components/FlowerCard';
import { useFavorites } from '@/context/FavoritesContext';
import { useFlowersStore } from '@/store/useFlowersStore';

const Shop = () => {
  const [selectedShop, setSelectedShop] = useState<string>('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const { isFavorite } = useFavorites();
  
  // Use Zustand store
  const { 
    flowers, 
    shops, 
    isLoading, 
    error, 
    fetchFlowers, 
    fetchShops 
  } = useFlowersStore();
  
  const ITEMS_PER_PAGE = 6;

  // Fetch data on component mount
  useEffect(() => {
    fetchFlowers();
    fetchShops();
  }, [fetchFlowers, fetchShops]);

  const filteredAndSortedFlowers = useMemo(() => {
    let filtered = flowers;

    // Filter by shop
    if (selectedShop !== 'all') {
      filtered = filtered.filter(flower => flower.shop?.name === selectedShop);
    }

    // Sort flowers
    const sorted = [...filtered].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'dateAdded':
          aValue = new Date(a.dateAdded).getTime();
          bValue = new Date(b.dateAdded).getTime();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return sorted;
  }, [selectedShop, sortBy, sortOrder, flowers]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedFlowers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedFlowers = filteredAndSortedFlowers.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = (setter: Function, value: any) => {
    setter(value);
    setCurrentPage(1);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading flowers...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Error Loading Flowers</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => { fetchFlowers(); fetchShops(); }}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Flower Shops</h1>
        <p className="text-gray-600">
          Discover beautiful flowers from our partner shops
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Shops:</h3>
              <div className="space-y-2">
                <Button
                  variant={selectedShop === 'all' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => handleFilterChange(setSelectedShop, 'all')}
                >
                  All Shops
                </Button>
                {shops.map((shop) => (
                  <Button
                    key={shop.id}
                    variant={selectedShop === shop.name ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => handleFilterChange(setSelectedShop, shop.name)}
                  >
                    {shop.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Sort by:</span>
              <Select value={sortBy} onValueChange={(value) => handleFilterChange(setSortBy, value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="dateAdded">Date Added</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => handleFilterChange(setSortOrder, value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Badge variant="secondary" className="text-sm">
              {filteredAndSortedFlowers.length} flowers found
            </Badge>
            
            {totalPages > 1 && (
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedFlowers.map((flower) => (
              <div key={flower.id} className="animate-fade-in">
                <FlowerCard 
                  flower={{...flower, isFavorite: isFavorite(flower.id)}}
                />
              </div>
            ))}
          </div>

          {filteredAndSortedFlowers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No flowers found in the selected shop.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage = 
                      page === 1 || 
                      page === totalPages || 
                      Math.abs(page - currentPage) <= 1;
                    
                    if (!showPage) {
                      // Show ellipsis
                      if (page === 2 && currentPage > 4) {
                        return (
                          <PaginationItem key={`ellipsis-${page}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      if (page === totalPages - 1 && currentPage < totalPages - 3) {
                        return (
                          <PaginationItem key={`ellipsis-${page}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    }
                    
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={`cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;