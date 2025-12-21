"use client";

import NextImage from "next/image";
import { cn } from "@/lib/utils";

// Gallery images organized by category - replace with real AI-generated examples later
const galleryImages = {
  portraits: [
    { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop", alt: "Portrait 1" },
    { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop", alt: "Portrait 2" },
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop", alt: "Portrait 3" },
  ],
  professional: [
    { src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop", alt: "Professional 1" },
    { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop", alt: "Professional 2" },
    { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop", alt: "Professional 3" },
  ],
  creative: [
    { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop", alt: "Creative 1" },
    { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop", alt: "Creative 2" },
    { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop", alt: "Creative 3" },
  ],
  family: [
    { src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop", alt: "Family 1" },
    { src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop", alt: "Family 2" },
  ],
};

interface ShowcaseGalleryProps {
  className?: string;
}

/**
 * ShowcaseGallery - Visual gallery showcasing what Memora can create
 * Masonry-style layout with hover effects
 */
export function ShowcaseGallery({ className }: ShowcaseGalleryProps) {
  // Flatten and arrange images for masonry effect
  const allImages = [
    ...galleryImages.portraits,
    ...galleryImages.professional,
    ...galleryImages.creative,
  ];

  return (
    <section className={cn("py-24 border-t border-border", className)}>
      <div className="container-wide">
        <div className="text-center mb-14">
          <h2 className="heading-lg text-foreground mb-4">
            See what we create
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every photo is carefully crafted to capture the moment you envision. Here&apos;s a glimpse of what&apos;s possible.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 max-w-6xl mx-auto">
          {allImages.map((img, idx) => (
            <div 
              key={idx}
              className="relative mb-4 break-inside-avoid group"
            >
              <div className="relative rounded-xl overflow-hidden bg-secondary">
                <NextImage
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground/70 mt-10 text-sm">
          All images shown are examples. Your photos will be uniquely crafted for you.
        </p>
      </div>
    </section>
  );
}

