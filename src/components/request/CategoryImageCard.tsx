"use client";

import NextImage from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryImageCardProps {
  id: string;
  label: string;
  description: string;
  image: string;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

/**
 * CategoryImageCard - Visual selection card for service categories
 * Shows an image with label and description, toggleable selection
 */
export function CategoryImageCard({
  id,
  label,
  description,
  image,
  isSelected,
  onToggle,
}: CategoryImageCardProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      className={cn(
        "relative group rounded-2xl overflow-hidden text-left transition-all duration-300",
        "border-2",
        isSelected 
          ? "border-primary ring-2 ring-primary/20" 
          : "border-border hover:border-primary/30"
      )}
    >
      {/* Image */}
      <div className="aspect-[4/3] relative">
        <NextImage
          src={image}
          alt={label}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            isSelected ? "scale-105" : "group-hover:scale-105"
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className={cn(
          "absolute inset-0 transition-all duration-300",
          isSelected 
            ? "bg-gradient-to-t from-primary/40 via-black/30 to-transparent" 
            : "bg-gradient-to-t from-black/60 via-black/20 to-transparent"
        )} />
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-white font-medium text-lg mb-1">{label}</h3>
        <p className="text-white/70 text-sm">{description}</p>
      </div>

      {/* Selection indicator */}
      <div className={cn(
        "absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300",
        isSelected 
          ? "bg-primary text-primary-foreground" 
          : "bg-white/20 backdrop-blur-sm border border-white/30"
      )}>
        {isSelected && <Check className="w-4 h-4" />}
      </div>
    </button>
  );
}

