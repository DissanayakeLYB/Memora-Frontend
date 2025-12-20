"use client";

import * as React from "react";
import { Upload, X, ImageIcon, AlertCircle } from "lucide-react";
import { cn, formatFileSize, isValidImageFile } from "@/lib/utils";
import { MAX_FILE_SIZE_MB, MAX_FILE_SIZE_BYTES } from "@/lib/constants";

interface UploadDropzoneProps {
  photos: File[];
  onChange: (photos: File[]) => void;
  maxPhotos?: number;
  maxSizeMB?: number;
}

interface FileError {
  fileName: string;
  error: string;
}

/**
 * UploadDropzone — Drag & drop photo upload component
 * 
 * Features:
 * - Drag & drop or click to browse
 * - Preview thumbnails
 * - File validation (type, size, count)
 * - Remove individual photos
 * - Gentle error handling
 */
export function UploadDropzone({
  photos,
  onChange,
  maxPhotos = 10,
  maxSizeMB = MAX_FILE_SIZE_MB,
}: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [errors, setErrors] = React.useState<FileError[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const newErrors: FileError[] = [];
    const validFiles: File[] = [];

    fileArray.forEach((file) => {
      // Check if already at max
      if (photos.length + validFiles.length >= maxPhotos) {
        newErrors.push({
          fileName: file.name,
          error: `Maximum ${maxPhotos} photos allowed`,
        });
        return;
      }

      // Check file type
      if (!isValidImageFile(file)) {
        newErrors.push({
          fileName: file.name,
          error: "Not a valid image file",
        });
        return;
      }

      // Check file size
      if (file.size > maxSizeBytes) {
        newErrors.push({
          fileName: file.name,
          error: `File too large (max ${maxSizeMB}MB)`,
        });
        return;
      }

      // Check for duplicates
      const isDuplicate = photos.some(
        (p) => p.name === file.name && p.size === file.size
      );
      if (isDuplicate) {
        newErrors.push({
          fileName: file.name,
          error: "File already added",
        });
        return;
      }

      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      onChange([...photos, ...validFiles]);
    }
    
    setErrors(newErrors);
    
    // Clear errors after 5 seconds
    if (newErrors.length > 0) {
      setTimeout(() => setErrors([]), 5000);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
    // Reset input so same file can be selected again
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    onChange(newPhotos);
  };

  const isAtMax = photos.length >= maxPhotos;

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isAtMax && inputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200",
          "flex flex-col items-center justify-center text-center",
          "min-h-[200px]",
          isDragging
            ? "border-primary bg-primary/5"
            : isAtMax
              ? "border-border bg-secondary/30 cursor-not-allowed"
              : "border-border hover:border-primary/50 hover:bg-secondary/30 cursor-pointer"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleInputChange}
          disabled={isAtMax}
          className="hidden"
        />

        <div
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors",
            isDragging ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
          )}
        >
          <Upload className="w-6 h-6" />
        </div>

        {isAtMax ? (
          <p className="text-muted-foreground">
            Maximum {maxPhotos} photos reached
          </p>
        ) : (
          <>
            <p className="text-foreground font-medium mb-1">
              {isDragging ? "Drop your photos here" : "Drop photos here or click to browse"}
            </p>
            <p className="text-sm text-muted-foreground">
              Up to {maxPhotos} photos • Max {maxSizeMB}MB each • JPG, PNG, WEBP
            </p>
          </>
        )}
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="space-y-2 animate-fade-in">
          {errors.map((error, index) => (
            <div
              key={index}
              className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm"
            >
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
              <span className="text-destructive/90">
                <span className="font-medium">{error.fileName}:</span> {error.error}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Photo previews */}
      {photos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{photos.length}</span>
              {" "}photo{photos.length !== 1 ? "s" : ""} selected
            </p>
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-sm text-destructive hover:text-destructive/80 transition-colors"
            >
              Remove all
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {photos.map((photo, index) => (
              <PhotoPreview
                key={`${photo.name}-${index}`}
                photo={photo}
                onRemove={() => removePhoto(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * PhotoPreview — Individual photo thumbnail with remove button
 */
function PhotoPreview({
  photo,
  onRemove,
}: {
  photo: File;
  onRemove: () => void;
}) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const url = URL.createObjectURL(photo);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  return (
    <div className="relative group aspect-square rounded-lg overflow-hidden bg-secondary animate-scale-in">
      {previewUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt={photo.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            loaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setLoaded(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-muted-foreground" />
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button
          type="button"
          onClick={onRemove}
          className="w-8 h-8 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/90 transition-colors"
          aria-label={`Remove ${photo.name}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* File info tooltip */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-xs text-white truncate">{photo.name}</p>
        <p className="text-xs text-white/70">{formatFileSize(photo.size)}</p>
      </div>
    </div>
  );
}

