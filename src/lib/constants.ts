// =====================================
// APPLICATION CONSTANTS
// =====================================

/**
 * Route paths
 */
export const ROUTES = {
  HOME: "/",
  REQUEST: "/request",
  THANK_YOU: "/thank-you",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  // Legacy routes (keeping for reference, but not used in service intake)
  LOGIN: "/login",
  REGISTER: "/register",
  WAITLIST: "/waitlist",
  DASHBOARD: "/dashboard",
  CREATE_ALBUM: "/create-album",
  ALBUM: (id: string) => `/album/${id}`,
} as const;

/**
 * Service request categories
 * Maps user-friendly categories to internal prompt categories
 */
export const SERVICE_CATEGORIES = [
  {
    id: "graduation",
    label: "Graduation Photos",
    description: "Cap, gown, and milestone moments",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    promptCategory: "graduation_ceremony_academic",
  },
  {
    id: "family",
    label: "Family Portraits",
    description: "Warm, natural family moments",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=300&fit=crop",
    promptCategory: "family_portrait_warm",
  },
  {
    id: "professional",
    label: "Professional Headshots",
    description: "Polished, confident business photos",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop",
    promptCategory: "professional_headshot_corporate",
  },
  {
    id: "creative",
    label: "Creative & Artistic",
    description: "Bold, expressive, unique styles",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop",
    promptCategory: "creative_artistic_editorial",
  },
  {
    id: "memorial",
    label: "Memorial Photos",
    description: "Honoring loved ones with care",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop",
    promptCategory: "memorial_remembrance_gentle",
  },
  {
    id: "couples",
    label: "Couples & Romance",
    description: "Intimate, loving moments together",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop",
    promptCategory: "couples_romantic_intimate",
  },
] as const;

/**
 * Album creation constraints
 */
export const MIN_STYLE_SELECTIONS = 1;
export const MAX_STYLE_SELECTIONS = 3;
export const MAX_PHOTOS_PER_ALBUM = 10;
export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

/**
 * Album creation steps
 */
export const ALBUM_CREATION_STEPS = [
  { number: 1, title: "Album Details", description: "Name your album" },
  { number: 2, title: "Choose Style", description: "Pick visual styles" },
  { number: 3, title: "Upload Photos", description: "Add your photos" },
  { number: 4, title: "Review", description: "Confirm & submit" },
] as const;

/**
 * API endpoints (will be replaced with real backend URLs)
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    ME: "/api/auth/me",
  },
  ALBUMS: {
    CREATE: "/api/albums",
    LIST: "/api/albums",
    GET: (id: string) => `/api/albums/${id}`,
    UPLOAD_PHOTOS: (id: string) => `/api/albums/${id}/photos`,
  },
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: "memora_auth_token",
  USER: "memora_user",
} as const;

