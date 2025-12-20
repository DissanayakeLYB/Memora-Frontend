"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlbumProgressBadge, GeneratedImageGrid } from "@/components/album";
import { isAuthenticated, getAlbum } from "@/lib/api";
import { ROUTES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import type { Album } from "@/types";

/**
 * Album Result Page — View album status and generated images
 * 
 * States:
 * - Loading: Fetching album data
 * - Submitted/In Progress: Show waiting state
 * - Completed: Show generated images gallery
 * - Failed: Show error with retry option
 */
export default function AlbumPage() {
  const params = useParams();
  const router = useRouter();
  const albumId = params.id as string;
  
  const [album, setAlbum] = React.useState<Album | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const fetchAlbum = React.useCallback(async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await getAlbum(albumId);
      if (response.success && response.data) {
        setAlbum(response.data);
      } else {
        setError(response.error || "Failed to load album");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [albumId]);

  React.useEffect(() => {
    if (!isAuthenticated()) {
      router.push(ROUTES.LOGIN);
      return;
    }
    fetchAlbum();
  }, [router, fetchAlbum]);

  // Auto-refresh for in-progress albums
  React.useEffect(() => {
    if (album?.status === "in_progress" || album?.status === "submitted") {
      const interval = setInterval(fetchAlbum, 30000); // Check every 30 seconds
      return () => clearInterval(interval);
    }
  }, [album?.status, fetchAlbum]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Error state
  if (error || !album) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="py-12 text-center">
            <p className="text-destructive mb-4">{error || "Album not found"}</p>
            <div className="flex items-center justify-center gap-3">
              <Link href={ROUTES.DASHBOARD}>
                <Button variant="secondary">Back to Dashboard</Button>
              </Link>
              <Button onClick={fetchAlbum}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-180px)] py-10">
      <div className="container-wide">
        {/* Back link */}
        <Link
          href={ROUTES.DASHBOARD}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Albums
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="heading-md text-foreground">{album.title}</h1>
              <AlbumProgressBadge status={album.status} />
            </div>
            {album.description && (
              <p className="body-md">{album.description}</p>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              Created {formatDate(album.createdAt)} • {album.uploadedPhotoCount} photos uploaded
            </p>
          </div>
        </div>

        {/* Status-specific content */}
        {(album.status === "submitted" || album.status === "in_progress") && (
          <ProcessingState album={album} />
        )}

        {album.status === "completed" && album.generatedImages && (
          <GeneratedImageGrid
            images={album.generatedImages}
            albumTitle={album.title}
          />
        )}

        {album.status === "failed" && (
          <FailedState onRetry={fetchAlbum} />
        )}
      </div>
    </div>
  );
}

/**
 * ProcessingState — Shown while album is being generated
 */
function ProcessingState({ album }: { album: Album }) {
  return (
    <Card className="max-w-xl mx-auto">
      <CardContent className="py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          {album.status === "submitted" ? (
            <Clock className="w-8 h-8 text-primary" />
          ) : (
            <RefreshCw className="w-8 h-8 text-primary animate-spin" />
          )}
        </div>
        
        <h2 className="text-xl font-serif font-medium text-foreground mb-3">
          {album.status === "submitted"
            ? "Album Submitted"
            : "Creating Your Album"}
        </h2>
        
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {album.status === "submitted"
            ? "Your album is in the queue. We'll start working on it soon and notify you when it's ready."
            : "We're carefully crafting your album. This usually takes 24-48 hours. We'll send you an email when it's complete."}
        </p>

        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>This page will auto-refresh</span>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * FailedState — Shown when album generation failed
 */
function FailedState({ onRetry }: { onRetry: () => void }) {
  return (
    <Card className="max-w-xl mx-auto">
      <CardContent className="py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">😔</span>
        </div>
        
        <h2 className="text-xl font-serif font-medium text-foreground mb-3">
          Something Went Wrong
        </h2>
        
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn't complete your album this time. This is rare, but it happens. 
          Please try again or contact our support if the issue persists.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={onRetry}>
            Check Status
          </Button>
          <Button>Contact Support</Button>
        </div>
      </CardContent>
    </Card>
  );
}

