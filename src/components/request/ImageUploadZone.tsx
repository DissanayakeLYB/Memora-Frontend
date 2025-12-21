"use client";

import * as React from "react";
import NextImage from "next/image";
import { Upload, X, ImageIcon, AlertCircle } from "lucide-react";
import { cn, formatFileSize, isValidImageFile } from "@/lib/utils";
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from "@/lib/constants";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

interface ImageUploadZoneProps {
  images: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
  maxImages?: number;
  minImages?: number;
}

/**
 * ImageUploadZone - Drag & drop zone for uploading reference photos
 * Shows preview thumbnails and handles validation
 */
export function ImageUploadZone({
  images,
  onImagesChange,
  maxImages = 10,
  minImages = 5,
}: ImageUploadZoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = React.useCallback((files: FileList | null) => {
    if (!files) return;

    setError(null);
    const newImages: UploadedImage[] = [];
    const currentCount = images.length;

    for (let i = 0; i < files.length; i++) {
      if (currentCount + newImages.length >= maxImages) {
        setError(`Maximum ${maxImages} images allowed`);
        break;
      }

      const file = files[i];

      if (!isValidImageFile(file)) {
        setError("Please upload only images (JPEG, PNG, WebP, HEIC)");
        continue;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`Each file must be under ${MAX_FILE_SIZE_MB}MB`);
        continue;
      }

      const preview = URL.createObjectURL(file);
      newImages.push({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview,
      });
    }

    if (newImages.length > 0) {
      onImagesChange([...images, ...newImages]);
    }
  }, [images, maxImages, onImagesChange]);

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleRemove = React.useCallback((id: string) => {
    const imageToRemove = images.find(img => img.id === id);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    onImagesChange(images.filter(img => img.id !== id));
  }, [images, onImagesChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300",
          isDragging 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50 hover:bg-secondary/30",
          images.length >= maxImages && "opacity-50 pointer-events-none"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/heic"
          multiple
          onChange={handleInputChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
            isDragging ? "bg-primary/20" : "bg-secondary"
          )}>
            <Upload className={cn(
              "w-7 h-7 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          <div>
            <p className="text-foreground font-medium mb-1">
              Drop your photos here
            </p>
            <p className="text-muted-foreground text-sm">
              or click to browse
            </p>
          </div>
          <div className="text-xs text-muted-foreground/70 space-y-1">
            <p>Upload {minImages}-{maxImages} photos • Max {MAX_FILE_SIZE_MB}MB each</p>
            <p>JPEG, PNG, WebP, or HEIC</p>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm p-3 rounded-lg bg-destructive/10">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Guidelines */}
      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
        <p className="text-sm font-medium text-foreground mb-2">Tips for best results:</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Face clearly visible in each photo
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Include different angles and expressions
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Avoid heavy filters if possible
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Good lighting helps us see details better
          </li>
        </ul>
      </div>

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-foreground font-medium">
              {images.length} photo{images.length !== 1 ? "s" : ""} selected
            </p>
            <p className="text-xs text-muted-foreground">
              {images.length < minImages 
                ? `Add ${minImages - images.length} more` 
                : "Ready to continue"}
            </p>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
            {images.map((image) => (
              <div key={image.id} className="relative aspect-square group">
                <div className="absolute inset-0 rounded-xl overflow-hidden bg-secondary">
                  <NextImage
                    src={image.preview}
                    alt="Upload preview"
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(image.id);
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-1 left-1 right-1 text-[10px] text-white bg-black/60 rounded px-1.5 py-0.5 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatFileSize(image.file.size)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

