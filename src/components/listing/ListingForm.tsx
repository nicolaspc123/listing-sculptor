
import React, { useState } from 'react';
import { Tag } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import ImageUpload from '@/components/ImageUpload';
import { toast } from 'sonner';

export type ListingFormData = {
  condition: string;
  newWithTag: string;
  price: string;
  notes: string;
  images: File[];
};

type ListingFormProps = {
  onChange: (data: Partial<ListingFormData>) => void;
  formData: ListingFormData;
};

const ListingForm: React.FC<ListingFormProps> = ({ onChange, formData }) => {
  const handleImagesChange = (files: File[]) => {
    onChange({ images: files });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
        <div>
          <Label htmlFor="condition">Condition</Label>
          <Select 
            value={formData.condition} 
            onValueChange={(value) => onChange({ condition: value })}
          >
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
          <Select 
            value={formData.newWithTag} 
            onValueChange={(value) => onChange({ newWithTag: value })}
          >
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
              value={formData.price}
              onChange={(e) => onChange({ price: e.target.value })}
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
          value={formData.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          className="mt-1.5 resize-none"
          rows={4}
        />
      </div>
      
      <div>
        <Label className="mb-2 block">Product Images</Label>
        <ImageUpload onImagesChange={handleImagesChange} />
      </div>
    </div>
  );
};

export default ListingForm;
