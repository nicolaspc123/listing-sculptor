
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ProductSearch, { ProductType } from './listing/ProductSearch';
import ProductCard from './listing/ProductCard';
import ProductDetails from './listing/ProductDetails';
import ListingForm, { ListingFormData } from './listing/ListingForm';

const AddListingForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [step, setStep] = useState<'search' | 'details'>('search');
  
  // Form state
  const [formData, setFormData] = useState<ListingFormData>({
    condition: '',
    newWithTag: '',
    price: '',
    notes: '',
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProductFound = (foundProduct: ProductType) => {
    setProduct(foundProduct);
    // Smooth transition to next step after product is found
    setTimeout(() => setStep('details'), 400);
  };

  const updateFormData = (updates: Partial<ListingFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.condition) {
      toast.error('Please select the product condition');
      return;
    }
    
    if (!formData.newWithTag) {
      toast.error('Please specify if the product has tags');
      return;
    }
    
    if (!formData.price) {
      toast.error('Please enter a listing price');
      return;
    }
    
    if (formData.images.length === 0) {
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

  const resetForm = () => {
    setProduct(null);
    setStep('search');
    setFormData({
      condition: '',
      newWithTag: '',
      price: '',
      notes: '',
      images: []
    });
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
          
          <ProductSearch onProductFound={handleProductFound} />
          
          {product && (
            <ProductCard product={product} onContinue={() => setStep('details')} />
          )}
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
              {product && <ProductDetails product={product} />}
            </div>
            
            <div className="md:col-span-2">
              <ListingForm onChange={updateFormData} formData={formData} />
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
