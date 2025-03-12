
import React, { useState } from 'react';
import { Search, ArrowRight, PackageCheck, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from './ImageUpload';
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

const AddListingForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [variantId, setVariantId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [step, setStep] = useState<'search' | 'details'>('search');
  
  // Form state
  const [condition, setCondition] = useState('');
  const [newWithTag, setNewWithTag] = useState('');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        // Smooth transition to next step after product is found
        setTimeout(() => setStep('details'), 400);
      } else {
        toast.error('Product not found. Please check the Variant ID and try again.');
      }
    } catch (error) {
      toast.error('An error occurred while searching for the product.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!condition) {
      toast.error('Please select the product condition');
      return;
    }
    
    if (!newWithTag) {
      toast.error('Please specify if the product has tags');
      return;
    }
    
    if (!price) {
      toast.error('Please enter a listing price');
      return;
    }
    
    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      toast.success('Listing created successfully!');
      onSuccess();
    } catch (error) {
      toast.error('An error occurred while creating the listing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagesChange = (files: File[]) => {
    setImages(files);
  };

  const resetForm = () => {
    setVariantId('');
    setProduct(null);
    setStep('search');
    setCondition('');
    setNewWithTag('');
    setPrice('');
    setNotes('');
    setImages([]);
  };

  return (
    <div className="animate-fadeIn">
      {step === 'search' ? (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">Add New Listing</h2>
            <p className="text-foreground/60">
              Search for a product by Variant ID to create a resale listing
            </p>
          </div>
          
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
            
            {product && (
              <Card className="animate-slideIn border-accent">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{product.title}</h3>
                      <p className="text-sm text-foreground/60 mb-1">Variant ID: {product.id}</p>
                      <p className="font-medium">
                        Original Price: ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <Button onClick={() => setStep('details')} className="flex-shrink-0">
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Create Resale Listing</h2>
              <p className="text-foreground/60">
                Add details for your resale product
              </p>
            </div>
            <Button variant="outline" onClick={resetForm}>
              Search Another Product
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-1">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <h3 className="font-medium mb-4 flex items-center">
                      <PackageCheck className="mr-2 h-5 w-5 text-primary" />
                      Product Information
                    </h3>
                    
                    <div className="mb-4">
                      <div className="h-32 w-full rounded-md overflow-hidden bg-muted mb-4">
                        <img
                          src={product?.image}
                          alt={product?.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <h4 className="font-medium text-lg">{product?.title}</h4>
                      <p className="text-sm text-foreground/60 mb-1">
                        Variant ID: {product?.id}
                      </p>
                      <p className="font-medium">
                        Original Price: ${product?.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-border">
                      <p className="text-xs text-foreground/60">
                        This is the original product information. Your resale listing will reference this product.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger id="condition" className="mt-1.5">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perfect">Perfect</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="newWithTag">New With Tag</Label>
                  <Select value={newWithTag} onValueChange={setNewWithTag}>
                    <SelectTrigger id="newWithTag" className="mt-1.5">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="price" className="flex items-center">
                    <Tag className="mr-1.5 h-4 w-4 text-foreground/70" />
                    Listing Price
                  </Label>
                  <div className="relative mt-1.5">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-foreground/70">$</span>
                    </div>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any details about the product condition, history, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1.5 resize-none"
                  rows={4}
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Product Images</Label>
                <ImageUpload onImagesChange={handleImagesChange} />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 border-t border-border pt-6">
            <Button
              variant="outline"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? 'Creating...' : 'Create Listing'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddListingForm;
