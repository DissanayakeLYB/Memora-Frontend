"use client";

import * as React from "react";
import Image from "next/image";
import { Download, ZoomIn, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GeneratedImage } from "@/types";

interface GeneratedImageGridProps {
  images: GeneratedImage[];
  albumTitle?: string;
}

/**
 * GeneratedImageGrid — Gallery display for AI-generated images
 * 
 * Features:
 * - Masonry-style grid layout
 * - Lightbox on click
 * - Individual & bulk download
 * - Smooth loading animations
 */
export function GeneratedImageGrid({
  images,
  albumTitle = "Album",
}: GeneratedImageGridProps) {
  const [selectedImage, setSelectedImage] = React.useState<GeneratedImage | null>(null);

  const handleDownload = async (image: GeneratedImage, e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${albumTitle.replace(/\s+/g, "-")}-${image.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleDownloadAll = async () => {
    for (const image of images) {
      await handleDownload(image);
      // Small delay between downloads
      await new Promise((r) => setTimeout(r, 200));
    }
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No images generated yet.</p>
      </div>
    );
  }

  return (
    <>
      {/* Header with download all */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">{images.length}</span> photos generated
        </p>
        <button
          onClick={handleDownloadAll}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
        >
          <Download className="w-4 h-4" />
          Download All
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <ImageCard
            key={image.id}
            image={image}
            index={index}
            onClick={() => setSelectedImage(image)}
            onDownload={(e) => handleDownload(image, e)}
          />
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onDownload={() => handleDownload(selectedImage)}
          onNext={() => {
            const currentIndex = images.findIndex((i) => i.id === selectedImage.id);
            const nextIndex = (currentIndex + 1) % images.length;
            setSelectedImage(images[nextIndex]);
          }}
          onPrev={() => {
            const currentIndex = images.findIndex((i) => i.id === selectedImage.id);
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            setSelectedImage(images[prevIndex]);
          }}
        />
      )}
    </>
  );
}

/**
 * ImageCard — Individual image in the grid
 */
function ImageCard({
  image,
  index,
  onClick,
  onDownload,
}: {
  image: GeneratedImage;
  index: number;
  onClick: () => void;
  onDownload: (e: React.MouseEvent) => void;
}) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative aspect-square rounded-xl overflow-hidden bg-secondary",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        "transition-all duration-300 hover:shadow-xl hover:shadow-black/30 hover:scale-[1.02]"
      )}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      <Image
        src={image.url}
        alt={`Generated image ${index + 1}`}
        fill
        className={cn(
          "object-cover transition-all duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setLoaded(true)}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />

      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-secondary gentle-pulse" />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-3">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
          <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <ZoomIn className="w-5 h-5 text-white" />
          </span>
          <button
            onClick={onDownload}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Download className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </button>
  );
}

/**
 * Lightbox — Full-screen image viewer
 */
function Lightbox({
  image,
  onClose,
  onDownload,
  onNext,
  onPrev,
}: {
  image: GeneratedImage;
  onClose: () => void;
  onDownload: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Download button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDownload();
        }}
        className="absolute top-4 right-16 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
        aria-label="Download image"
      >
        <Download className="w-5 h-5 text-white" />
      </button>

      {/* Navigation */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Next image"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.url}
          alt="Generated image"
          width={1200}
          height={1200}
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
          priority
        />
      </div>
    </div>
  );
}

