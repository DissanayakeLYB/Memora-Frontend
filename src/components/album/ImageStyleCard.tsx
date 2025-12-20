"use client";

import * as React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ImageStyle } from "@/types";

interface ImageStyleCardProps {
  style: ImageStyle;
  isSelected: boolean;
  onSelect: (style: ImageStyle) => void;
  disabled?: boolean;
}

/**
 * ImageStyleCard — Visual style selection card
 * 
 * Design philosophy:
 * - Image-first, label secondary
 * - Gentle hover/select states
 * - Checkbox behavior but feels like picking a photo
 * - Users never see technical prompt IDs
 */
export function ImageStyleCard({
  style,
  isSelected,
  onSelect,
  disabled = false,
}: ImageStyleCardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleClick = () => {
    if (!disabled) {
      onSelect(style);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && !disabled) {
      e.preventDefault();
      onSelect(style);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={cn(
        "group relative overflow-hidden rounded-xl transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        "aspect-[4/3] w-full",
        isSelected
          ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[0.98]"
          : "hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30",
        disabled && !isSelected && "opacity-50 cursor-not-allowed"
      )}
      aria-pressed={isSelected}
      aria-label={`Select ${style.label} style`}
    >
      {/* Background gradient placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900" />
      
      {/* Image */}
      {!imageError && (
        <Image
          src={style.imageUrl}
          alt={style.label}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            imageLoaded ? "opacity-100" : "opacity-0",
            isSelected ? "brightness-90" : "group-hover:brightness-110"
          )}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}

      {/* Error fallback */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-800">
          <span className="text-stone-500 text-sm">{style.label}</span>
        </div>
      )}

      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Selection indicator */}
      <div
        className={cn(
          "absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200",
          isSelected
            ? "bg-primary text-primary-foreground scale-100"
            : "bg-black/40 text-white/50 scale-90 group-hover:scale-100 group-hover:bg-black/60"
        )}
      >
        {isSelected ? (
          <Check className="w-4 h-4" strokeWidth={3} />
        ) : (
          <div className="w-3 h-3 rounded-full border-2 border-current" />
        )}
      </div>

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-white text-sm font-medium drop-shadow-lg">
          {style.label}
        </span>
      </div>
    </button>
  );
}

