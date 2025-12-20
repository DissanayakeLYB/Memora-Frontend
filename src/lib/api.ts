import type { ApiResponse, Album, User, AlbumFormData } from "@/types";
import { STORAGE_KEYS } from "./constants";
import { delay, generateMockId } from "./utils";
import { getStyleById } from "./imageStyles";

// =====================================
// API CLIENT
// =====================================
// 
// This file contains mock API functions for frontend development.
// Replace these with real fetch calls when backend is ready.
//
// All functions follow the pattern:
// - Return ApiResponse<T> wrapper
// - Simulate network delay
// - Handle errors gracefully
// =====================================

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  return !!token;
}

/**
 * Get current user from storage
 */
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const userJson = localStorage.getItem(STORAGE_KEYS.USER);
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}

/**
 * Login user
 */
export async function login(
  email: string,
  password: string
): Promise<ApiResponse<{ user: User; token: string }>> {
  // Simulate network delay
  await delay(1000);

  // Mock validation
  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  // Mock successful login
  const mockUser: User = {
    id: "user_1",
    name: email.split("@")[0],
    email,
  };
  const mockToken = `mock_token_${Date.now()}`;

  // Store in localStorage
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));

  return {
    success: true,
    data: { user: mockUser, token: mockToken },
  };
}

/**
 * Register new user
 */
export async function register(
  name: string,
  email: string,
  password: string
): Promise<ApiResponse<{ user: User; token: string }>> {
  await delay(1200);

  if (!name || !email || !password) {
    return { success: false, error: "All fields are required" };
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" };
  }

  const mockUser: User = {
    id: `user_${Date.now()}`,
    name,
    email,
  };
  const mockToken = `mock_token_${Date.now()}`;

  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));

  return {
    success: true,
    data: { user: mockUser, token: mockToken },
  };
}

/**
 * Logout user
 */
export async function logout(): Promise<ApiResponse<null>> {
  await delay(300);
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  return { success: true };
}

/**
 * Create a new album
 */
export async function createAlbum(
  formData: AlbumFormData
): Promise<ApiResponse<Album>> {
  await delay(1500);

  // Validate
  if (!formData.title.trim()) {
    return { success: false, error: "Album title is required" };
  }
  if (formData.selectedStyleIds.length === 0) {
    return { success: false, error: "Please select at least one style" };
  }
  if (formData.photos.length === 0) {
    return { success: false, error: "Please upload at least one photo" };
  }

  // Create mock album
  const selectedStyles = formData.selectedStyleIds
    .map((id) => getStyleById(id))
    .filter(Boolean);

  const album: Album = {
    id: generateMockId(),
    title: formData.title,
    description: formData.description,
    status: "submitted",
    selectedStyles: selectedStyles as Album["selectedStyles"],
    uploadedPhotoCount: formData.photos.length,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // In real implementation, you would:
  // 1. Upload photos to backend/storage
  // 2. Create album record
  // 3. Trigger processing pipeline

  // Log what would be sent to backend
  console.log("📦 Album submission payload:", {
    albumTitle: formData.title,
    description: formData.description,
    selectedStyleIds: formData.selectedStyleIds,
    selectedPromptGroups: selectedStyles.map((s) => s?.backendPromptGroup),
    uploadedPhotos: formData.photos.map((f) => f.name),
  });

  return { success: true, data: album };
}

/**
 * Get album by ID
 */
export async function getAlbum(id: string): Promise<ApiResponse<Album>> {
  await delay(800);

  // Mock album data
  // In real app, fetch from backend
  const mockAlbum: Album = {
    id,
    title: "Sample Album",
    description: "A beautiful collection of memories",
    status: "completed",
    selectedStyles: [],
    uploadedPhotoCount: 5,
    generatedImages: [
      {
        id: "img_1",
        url: "/samples/graduation-warm.jpg",
        styleId: "graduation_warm_01",
        createdAt: new Date().toISOString(),
      },
      {
        id: "img_2",
        url: "/samples/family-warm.jpg",
        styleId: "family_warm_01",
        createdAt: new Date().toISOString(),
      },
      {
        id: "img_3",
        url: "/samples/portrait-soft.jpg",
        styleId: "portrait_soft_01",
        createdAt: new Date().toISOString(),
      },
      {
        id: "img_4",
        url: "/samples/outdoor-golden.jpg",
        styleId: "outdoor_golden_01",
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return { success: true, data: mockAlbum };
}

/**
 * Get user's albums
 */
export async function getUserAlbums(): Promise<ApiResponse<Album[]>> {
  await delay(600);

  const mockAlbums: Album[] = [
    {
      id: "album_demo_1",
      title: "Summer Memories",
      status: "completed",
      selectedStyles: [],
      uploadedPhotoCount: 8,
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "album_demo_2",
      title: "Birthday Celebration",
      status: "in_progress",
      selectedStyles: [],
      uploadedPhotoCount: 5,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return { success: true, data: mockAlbums };
}

