
import React, { useState } from 'react';
import { Plus, Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Sidebar from '@/components/Sidebar';
import ListingsTable, { Listing } from '@/components/ListingsTable';
import AddListingForm from '@/components/AddListingForm';

// Mock data for listings
const MOCK_LISTINGS: Listing[] = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  orderName: `#34${i + 1}567`,
  createdAt: '10 January, 2024',
  seller: 'Dylan Lim',
  status: ['pending', 'listed', 'confirmed', 'completed', 'expired', 'cancelled', 'rejected'][
    i % 7
  ] as Listing['status'],
}));

const ManageListings = () => {
  const [listings] = useState<Listing[]>(MOCK_LISTINGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleViewListing = (id: string) => {
    console.log(`View listing ${id}`);
    // Implement viewing functionality
  };

  const handleAddListingSuccess = () => {
    setShowAddDialog(false);
    // In a real app, you would refresh the listings or add the new one
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
  };

  const hasFilters = searchTerm || statusFilter;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold">Manage Listing</h1>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Listing
            </Button>
          </div>
          
          <div className="bg-white rounded-lg border border-border p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-foreground/40" />
                <Input
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="listed">Listed</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center justify-end">
                <Button variant="outline" className="mr-2">
                  More filters
                </Button>
                
                {hasFilters && (
                  <Button variant="ghost" onClick={clearFilters} size="sm">
                    Clear all
                  </Button>
                )}
              </div>
            </div>
            
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mt-4">
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center gap-1 py-1.5">
                    Search: {searchTerm}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSearchTerm('')}
                    />
                  </Badge>
                )}
                
                {statusFilter && (
                  <Badge variant="secondary" className="flex items-center gap-1 py-1.5">
                    Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setStatusFilter('')}
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
          
          <ListingsTable
            listings={listings}
            onViewListing={handleViewListing}
          />

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogContent className="max-w-4xl p-0 overflow-auto max-h-[95vh]">
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle>Add New Listing</DialogTitle>
                  <DialogDescription>
                    Create a new resale listing for your store
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-6">
                  <AddListingForm onSuccess={handleAddListingSuccess} />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default ManageListings;
