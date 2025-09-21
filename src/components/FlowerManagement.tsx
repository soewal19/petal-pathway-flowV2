import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFlowersStore, CreateFlowerDto, UpdateFlowerDto } from '@/store/useFlowersStore';
import { Trash2, Edit, Plus } from 'lucide-react';
import WebSocketStatus from './WebSocketStatus';

const FlowerManagement = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingFlower, setEditingFlower] = useState<any>(null);
  const [createForm, setCreateForm] = useState<CreateFlowerDto>({
    name: '',
    price: 0,
    image: '',
    description: '',
    shopId: '',
  });
  const [updateForm, setUpdateForm] = useState<UpdateFlowerDto>({});

  const { 
    flowers, 
    shops, 
    isLoading, 
    createFlower, 
    updateFlower, 
    deleteFlower 
  } = useFlowersStore();

  const handleCreateFlower = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.name || !createForm.shopId) return;
    
    await createFlower(createForm);
    setCreateForm({
      name: '',
      price: 0,
      image: '',
      description: '',
      shopId: '',
    });
    setIsCreateDialogOpen(false);
  };

  const handleUpdateFlower = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFlower?.id) return;
    
    await updateFlower(editingFlower.id, updateForm);
    setEditingFlower(null);
    setUpdateForm({});
  };

  const handleDeleteFlower = async (id: string) => {
    if (confirm('Are you sure you want to delete this flower?')) {
      await deleteFlower(id);
    }
  };

  const openEditDialog = (flower: any) => {
    setEditingFlower(flower);
    setUpdateForm({
      name: flower.name,
      price: flower.price,
      image: flower.image,
      description: flower.description,
      shopId: flower.shopId,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Flower Management</h1>
            <p className="text-gray-600">
              Manage flowers in your shops with real-time updates
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <WebSocketStatus />
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Flower
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Flower</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateFlower} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={createForm.name}
                      onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={createForm.price}
                      onChange={(e) => setCreateForm({ ...createForm, price: parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={createForm.image}
                      onChange={(e) => setCreateForm({ ...createForm, image: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={createForm.description}
                      onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shop">Shop</Label>
                    <Select value={createForm.shopId} onValueChange={(value) => setCreateForm({ ...createForm, shopId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a shop" />
                      </SelectTrigger>
                      <SelectContent>
                        {shops.map((shop) => (
                          <SelectItem key={shop.id} value={shop.id}>
                            {shop.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      Create Flower
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Flowers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flowers.map((flower) => (
          <Card key={flower.id} className="overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <img
                src={flower.image}
                alt={flower.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{flower.name}</span>
                <Badge variant="secondary">${flower.price}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{flower.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  {flower.shop?.name}
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(flower)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteFlower(flower.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingFlower} onOpenChange={() => setEditingFlower(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Flower</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateFlower} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={updateForm.name || ''}
                onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-price">Price</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                value={updateForm.price || ''}
                onChange={(e) => setUpdateForm({ ...updateForm, price: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                value={updateForm.image || ''}
                onChange={(e) => setUpdateForm({ ...updateForm, image: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={updateForm.description || ''}
                onChange={(e) => setUpdateForm({ ...updateForm, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-shop">Shop</Label>
              <Select value={updateForm.shopId || ''} onValueChange={(value) => setUpdateForm({ ...updateForm, shopId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a shop" />
                </SelectTrigger>
                <SelectContent>
                  {shops.map((shop) => (
                    <SelectItem key={shop.id} value={shop.id}>
                      {shop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Update Flower
              </Button>
              <Button type="button" variant="outline" onClick={() => setEditingFlower(null)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-2"></div>
            <p className="text-center">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowerManagement;

