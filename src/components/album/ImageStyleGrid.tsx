"use client";

import * as React from "react";
import { ImageStyleCard } from "./ImageStyleCard";
import { getAllStyles, getAllCategories } from "@/lib/imageStyles";
import { cn } from "@/lib/utils";
import type { ImageStyle } from "@/types";

interface ImageStyleGridProps {
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  maxSelections?: number;
}

/**
 * ImageStyleGrid — Grid display of selectable visual styles
 * 
 * Features:
 * - Grouped by category
 * - Multi-select with max limit
 * - Responsive grid layout
 * - Selection count indicator
 */
export function ImageStyleGrid({
  selectedIds,
  onSelectionChange,
  maxSelections = 3,
}: ImageStyleGridProps) {
  const allStyles = getAllStyles();
  const categories = getAllCategories();
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);

  // Filter styles by category if one is selected
  const displayedStyles = activeCategory
    ? allStyles.filter((s) => s.category === activeCategory)
    : allStyles;

  const handleStyleSelect = (style: ImageStyle) => {
    const isCurrentlySelected = selectedIds.includes(style.id);

    if (isCurrentlySelected) {
      // Deselect
      onSelectionChange(selectedIds.filter((id) => id !== style.id));
    } else if (selectedIds.length < maxSelections) {
      // Select (if under limit)
      onSelectionChange([...selectedIds, style.id]);
    }
    // If at max and trying to add, do nothing (card appears disabled)
  };

  const isAtMax = selectedIds.length >= maxSelections;

  return (
    <div className="space-y-6">
      {/* Selection counter */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{selectedIds.length}</span>
          {" "}of {maxSelections} styles selected
        </p>
        
        {selectedIds.length > 0 && (
          <button
            type="button"
            onClick={() => onSelectionChange([])}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm transition-all duration-200",
            activeCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm transition-all duration-200",
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedStyles.map((style) => {
          const isSelected = selectedIds.includes(style.id);
          const isDisabled = !isSelected && isAtMax;

          return (
            <ImageStyleCard
              key={style.id}
              style={style}
              isSelected={isSelected}
              onSelect={handleStyleSelect}
              disabled={isDisabled}
            />
          );
        })}
      </div>

      {/* Helper text when at max */}
      {isAtMax && (
        <p className="text-center text-sm text-muted-foreground animate-fade-in">
          Maximum styles selected. Deselect one to choose another.
        </p>
      )}
    </div>
  );
}

