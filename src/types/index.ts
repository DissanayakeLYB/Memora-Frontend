// =====================================
// MEMORA TYPE DEFINITIONS
// =====================================

/**
 * Image Style — represents a visual style option users can select
 * Users see: image + label
 * Backend receives: id + backendPromptGroup
 */
export interface ImageStyle {
  id: string;
  label: string;
  imageUrl: string;
  backendPromptGroup: string;
  category?: string;
}

/**
 * Album Creation Step (1-4)
 */
export type AlbumCreationStep = 1 | 2 | 3 | 4;

/**
 * Album Form Data — collected during creation flow
 */
export interface AlbumFormData {
  title: string;
  description: string;
  selectedStyleIds: string[];
  photos: File[];
}

/**
 * Album Status — tracks progress of album generation
 */
export type AlbumStatus = "submitted" | "in_progress" | "completed" | "failed";

/**
 * Album — represents a user's album
 */
export interface Album {
  id: string;
  title: string;
  description?: string;
  status: AlbumStatus;
  selectedStyles: ImageStyle[];
  uploadedPhotoCount: number;
  generatedImages?: GeneratedImage[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Generated Image — an AI-generated image result
 */
export interface GeneratedImage {
  id: string;
  url: string;
  thumbnailUrl?: string;
  styleId: string;
  createdAt: string;
}

/**
 * User — basic user information
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Auth state
 */
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * Album submission payload — what we send to backend
 */
export interface AlbumSubmissionPayload {
  albumTitle: string;
  description: string;
  selectedStyleIds: string[];
  selectedPromptGroups: string[];
  uploadedPhotos: File[];
}

