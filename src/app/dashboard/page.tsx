"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Loader2, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlbumProgressBadge } from "@/components/album";
import { isAuthenticated, getUserAlbums } from "@/lib/api";
import { ROUTES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import type { Album } from "@/types";

/**
 * Dashboard Page — User's album list
 * 
 * Shows all user albums with status indicators
 */
export default function DashboardPage() {
  const router = useRouter();
  const [albums, setAlbums] = React.useState<Album[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!isAuthenticated()) {
      router.push(ROUTES.LOGIN);
      return;
    }

    const fetchAlbums = async () => {
      const response = await getUserAlbums();
      if (response.success && response.data) {
        setAlbums(response.data);
      }
      setIsLoading(false);
    };

    fetchAlbums();
  }, [router]);

  return (
    <div className="min-h-[calc(100vh-180px)] py-10">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="heading-md text-foreground">My Albums</h1>
            <p className="body-md mt-1">Your cherished memories, all in one place</p>
          </div>
          <Link href={ROUTES.CREATE_ALBUM}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Album
            </Button>
          </Link>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && albums.length === 0 && (
          <Card className="max-w-md mx-auto">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
                <FolderOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-serif font-medium text-foreground mb-2">
                No albums yet
              </h2>
              <p className="text-muted-foreground mb-6">
                Create your first album and start preserving your memories.
              </p>
              <Link href={ROUTES.CREATE_ALBUM}>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Album
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Album grid */}
        {!isLoading && albums.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * AlbumCard — Individual album preview card
 */
function AlbumCard({ album }: { album: Album }) {
  return (
    <Link href={ROUTES.ALBUM(album.id)}>
      <Card className="group overflow-hidden card-hover cursor-pointer">
        {/* Thumbnail area */}
        <div className="aspect-[4/3] bg-secondary relative">
          {/* Placeholder gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-700 to-stone-800" />
          
          {/* Status badge */}
          <div className="absolute top-3 right-3">
            <AlbumProgressBadge status={album.status} showLabel={false} />
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-serif font-medium text-foreground truncate">
                {album.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {album.uploadedPhotoCount} photos • {formatDate(album.createdAt)}
              </p>
            </div>
            <AlbumProgressBadge status={album.status} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

