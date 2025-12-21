"use client";

import NextImage from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Style examples - replace with real AI-generated examples later
const styles = [
  {
    id: "graduation",
    title: "Graduation",
    description: "Celebrate your achievement",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1627556704302-624286467c65?w=400&h=500&fit=crop",
    ],
  },
  {
    id: "professional",
    title: "Professional",
    description: "Polished business portraits",
    images: [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    ],
  },
  {
    id: "creative",
    title: "Creative & Artistic",
    description: "Bold, expressive styles",
    images: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop",
    ],
  },
  {
    id: "family",
    title: "Family Portraits",
    description: "Warm, natural moments",
    images: [
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop",
    ],
  },
  {
    id: "couples",
    title: "Couples & Romance",
    description: "Intimate, loving moments",
    images: [
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=500&fit=crop",
    ],
  },
  {
    id: "editorial",
    title: "Editorial & Fashion",
    description: "Magazine-worthy looks",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop",
    ],
  },
];

interface StyleShowcaseProps {
  className?: string;
}

/**
 * StyleShowcase - Displays available photo styles with examples
 * Each style shows multiple example images
 */
export function StyleShowcase({ className }: StyleShowcaseProps) {
  return (
    <section className={cn("py-24 border-t border-border", className)}>
      <div className="container-wide">
        <div className="text-center mb-14">
          <h2 className="heading-lg text-foreground mb-4">
            Choose your style
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From professional headshots to creative portraits — tell us what you&apos;re looking for and we&apos;ll bring it to life.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {styles.map((style) => (
            <div 
              key={style.id}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all duration-300"
            >
              {/* Stacked Images */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Back image */}
                <div className="absolute top-3 left-3 right-3 bottom-0 rounded-t-lg overflow-hidden opacity-60">
                  <NextImage
                    src={style.images[1]}
                    alt={style.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* Front image */}
                <div className="absolute inset-0 rounded-lg overflow-hidden shadow-lg">
                  <NextImage
                    src={style.images[0]}
                    alt={style.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-medium text-lg mb-1">{style.title}</h3>
                <p className="text-white/70 text-sm">{style.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={ROUTES.REQUEST}>
            <Button size="lg" className="group">
              Request Your Photos
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

