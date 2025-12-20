import type { ImageStyle } from "@/types";
import { MIN_STYLE_SELECTIONS, MAX_STYLE_SELECTIONS } from "./constants";

// =====================================
// IMAGE STYLES CONFIGURATION
// =====================================
// 
// This file maps visual sample images to backend prompt groups.
// Users select images visually; they never see prompt IDs.
// Frontend sends: id + backendPromptGroup to backend.
//
// To add new styles:
// 1. Add image to /public/samples/
// 2. Add entry here with unique id, label, imageUrl, backendPromptGroup
// 3. Backend must recognize the backendPromptGroup
// =====================================

export const IMAGE_STYLES: ImageStyle[] = [
  // Graduation styles
  {
    id: "graduation_warm_01",
    label: "Graduation – calm & proud",
    imageUrl: "/samples/graduation-warm.jpg",
    backendPromptGroup: "GRADUATION_WARM",
    category: "Graduation",
  },
  {
    id: "graduation_joy_02",
    label: "Graduation – joyful celebration",
    imageUrl: "/samples/graduation-joy.jpg",
    backendPromptGroup: "GRADUATION_JOY",
    category: "Graduation",
  },
  
  // Family styles
  {
    id: "family_warm_01",
    label: "Warm family moment",
    imageUrl: "/samples/family-warm.jpg",
    backendPromptGroup: "FAMILY_WARM",
    category: "Family",
  },
  {
    id: "family_outdoor_02",
    label: "Family in nature",
    imageUrl: "/samples/family-outdoor.jpg",
    backendPromptGroup: "FAMILY_OUTDOOR",
    category: "Family",
  },
  {
    id: "family_gathering_03",
    label: "Family gathering",
    imageUrl: "/samples/family-gathering.jpg",
    backendPromptGroup: "FAMILY_GATHERING",
    category: "Family",
  },

  // Portrait styles
  {
    id: "portrait_soft_01",
    label: "Soft portrait light",
    imageUrl: "/samples/portrait-soft.jpg",
    backendPromptGroup: "PORTRAIT_SOFT",
    category: "Portrait",
  },
  {
    id: "portrait_classic_02",
    label: "Classic portrait",
    imageUrl: "/samples/portrait-classic.jpg",
    backendPromptGroup: "PORTRAIT_CLASSIC",
    category: "Portrait",
  },
  {
    id: "portrait_candid_03",
    label: "Candid moment",
    imageUrl: "/samples/portrait-candid.jpg",
    backendPromptGroup: "PORTRAIT_CANDID",
    category: "Portrait",
  },

  // Celebration styles
  {
    id: "celebration_intimate_01",
    label: "Intimate celebration",
    imageUrl: "/samples/celebration-intimate.jpg",
    backendPromptGroup: "CELEBRATION_INTIMATE",
    category: "Celebration",
  },
  {
    id: "celebration_party_02",
    label: "Festive party mood",
    imageUrl: "/samples/celebration-party.jpg",
    backendPromptGroup: "CELEBRATION_PARTY",
    category: "Celebration",
  },

  // Nature & Outdoors
  {
    id: "outdoor_golden_01",
    label: "Golden hour outdoors",
    imageUrl: "/samples/outdoor-golden.jpg",
    backendPromptGroup: "OUTDOOR_GOLDEN",
    category: "Outdoors",
  },
  {
    id: "outdoor_serene_02",
    label: "Serene nature moment",
    imageUrl: "/samples/outdoor-serene.jpg",
    backendPromptGroup: "OUTDOOR_SERENE",
    category: "Outdoors",
  },
];

/**
 * Get all available styles
 */
export function getAllStyles(): ImageStyle[] {
  return IMAGE_STYLES;
}

/**
 * Get style by ID
 */
export function getStyleById(id: string): ImageStyle | undefined {
  return IMAGE_STYLES.find((style) => style.id === id);
}

/**
 * Get styles by category
 */
export function getStylesByCategory(category: string): ImageStyle[] {
  return IMAGE_STYLES.filter((style) => style.category === category);
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const categories = IMAGE_STYLES.map((style) => style.category).filter(Boolean) as string[];
  return Array.from(new Set(categories));
}

/**
 * Validate style selection
 */
export function validateStyleSelection(selectedIds: string[]): {
  valid: boolean;
  error?: string;
} {
  if (selectedIds.length < MIN_STYLE_SELECTIONS) {
    return {
      valid: false,
      error: `Please select at least ${MIN_STYLE_SELECTIONS} style${MIN_STYLE_SELECTIONS > 1 ? "s" : ""}`,
    };
  }

  if (selectedIds.length > MAX_STYLE_SELECTIONS) {
    return {
      valid: false,
      error: `You can select up to ${MAX_STYLE_SELECTIONS} styles`,
    };
  }

  // Validate all IDs exist
  const invalidIds = selectedIds.filter((id) => !getStyleById(id));
  if (invalidIds.length > 0) {
    return {
      valid: false,
      error: "Some selected styles are invalid",
    };
  }

  return { valid: true };
}

/**
 * Get backend payload for selected styles
 */
export function getStylesPayload(selectedIds: string[]): {
  styleIds: string[];
  promptGroups: string[];
} {
  const styles = selectedIds
    .map((id) => getStyleById(id))
    .filter((style): style is ImageStyle => style !== undefined);

  return {
    styleIds: styles.map((s) => s.id),
    promptGroups: styles.map((s) => s.backendPromptGroup),
  };
}

