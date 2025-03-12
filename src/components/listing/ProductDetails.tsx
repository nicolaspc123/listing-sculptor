
import React from 'react';
import { PackageCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ProductType } from './ProductSearch';

type ProductDetailsProps = {
  product: ProductType;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
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
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
            
            <h4 className="font-medium text-lg">{product.title}</h4>
            <p className="text-sm text-foreground/60 mb-1">
              Variant ID: {product.id}
            </p>
            <p className="font-medium">
              Original Price: ${product.price.toFixed(2)}
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
  );
};

export default ProductDetails;
