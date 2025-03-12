
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

// Mock function to simulate API call
const searchProduct = async (variantId: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock product data
  if (variantId && variantId.length > 3) {
    return {
      id: variantId,
      title: "Organic Cotton T-Shirt",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    };
  }
  
  return null;
};

export type ProductType = {
  id: string;
  title: string;
  price: number;
  image: string;
};

type ProductSearchProps = {
  onProductFound: (product: ProductType) => void;
};

const ProductSearch: React.FC<ProductSearchProps> = ({ onProductFound }) => {
  const [variantId, setVariantId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);

  const handleSearch = async () => {
    if (!variantId.trim()) {
      toast.error('Please enter a Variant ID');
      return;
    }
    
    setIsSearching(true);
    try {
      const result = await searchProduct(variantId);
      if (result) {
        setProduct(result);
        onProductFound(result);
      } else {
        toast.error('Product not found. Please check the Variant ID and try again.');
      }
    } catch (error) {
      toast.error('An error occurred while searching for the product.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <div className="flex-1">
          <Label htmlFor="variantId">Variant ID</Label>
          <div className="relative mt-1.5">
            <Input
              id="variantId"
              placeholder="Enter product variant ID"
              value={variantId}
              onChange={(e) => setVariantId(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-foreground/40" />
          </div>
        </div>
        <div className="flex items-end">
          <Button 
            onClick={handleSearch} 
            disabled={isSearching || !variantId.trim()}
            className="mt-1.5"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>
      
      {isSearching && (
        <div className="rounded-lg border border-border p-6 flex items-center justify-center">
          <div className="shimmer h-16 w-full rounded"></div>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
