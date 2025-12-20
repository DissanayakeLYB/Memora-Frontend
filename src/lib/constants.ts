// =====================================
// APPLICATION CONSTANTS
// =====================================

/**
 * Route paths
 */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  CREATE_ALBUM: "/create-album",
  ALBUM: (id: string) => `/album/${id}`,
  PRIVACY: "/privacy",
  TERMS: "/terms",
} as const;

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

