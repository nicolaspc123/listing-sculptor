
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductType } from './ProductSearch';

type ProductCardProps = {
  product: ProductType;
  onContinue: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onContinue }) => {
  if (!product) return null;
  
  return (
    <Card className="animate-slideIn border-accent">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
            <img
              src={product.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop"}
              alt={product.title || "Product Image"}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg">{product.title || "Product"}</h3>
            <p className="text-sm text-foreground/60 mb-1">Variant ID: {product.id || "N/A"}</p>
            <p className="font-medium">
              Original Price: ${product?.price ? product.price.toFixed(2) : "0.00"}
            </p>
          </div>
          <Button onClick={onContinue} className="flex-shrink-0">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
