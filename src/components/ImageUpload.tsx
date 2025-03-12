
import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ImageUploadProps = {
  onImagesChange: (files: File[]) => void;
  maxImages?: number;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImagesChange, 
  maxImages = 5 
}) => {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newFiles = Array.from(files).filter(
        file => file.type.startsWith('image/')
      );

      if (images.length + newFiles.length > maxImages) {
        // You could add a toast notification here
        console.warn(`You can only upload up to ${maxImages} images.`);
        return;
      }

      const newImages = newFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onImagesChange(updatedImages.map(img => img.file));
    },
    [images, maxImages, onImagesChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileChange(e.dataTransfer.files);
    },
    [handleFileChange]
  );

  const removeImage = useCallback(
    (index: number) => {
      const updatedImages = [...images];
      URL.revokeObjectURL(updatedImages[index].preview);
      updatedImages.splice(index, 1);
      setImages(updatedImages);
      onImagesChange(updatedImages.map(img => img.file));
    },
    [images, onImagesChange]
  );

  const openFileDialog = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  return (
    <div className="space-y-4">
      <div
        className={cn("image-upload-container", isDragging && "drag-active")}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={e => handleFileChange(e.target.files)}
          multiple
          accept="image/*"
          className="hidden"
        />
        <Upload className="w-8 h-8 text-foreground/50 mb-2" />
        <p className="text-sm font-medium text-foreground/80">
          Drag and drop images here
        </p>
        <p className="text-xs text-foreground/50 mt-1">
          or click to browse (max {maxImages} images)
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group animate-fadeIn">
              <div className="rounded-md overflow-hidden border border-border aspect-square bg-muted/50">
                <img
                  src={image.preview}
                  alt={`Preview ${index}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
