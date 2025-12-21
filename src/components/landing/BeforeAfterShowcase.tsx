"use client";

import NextImage from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Before/After examples - replace with real examples later
const transformations = [
  {
    before: {
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
      label: "Your selfie",
    },
    after: {
      src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop",
      label: "Professional portrait",
    },
  },
  {
    before: {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
      label: "Casual photo",
    },
    after: {
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
      label: "Business headshot",
    },
  },
  {
    before: {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
      label: "Phone selfie",
    },
    after: {
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
      label: "Editorial style",
    },
  },
];

interface BeforeAfterShowcaseProps {
  className?: string;
}

/**
 * BeforeAfterShowcase - Shows transformation examples
 * Demonstrates the value of the service visually
 */
export function BeforeAfterShowcase({ className }: BeforeAfterShowcaseProps) {
  return (
    <section className={cn("py-24 border-t border-border bg-secondary/20", className)}>
      <div className="container-wide">
        <div className="text-center mb-14">
          <h2 className="heading-lg text-foreground mb-4">
            From everyday photos to stunning results
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You provide casual photos. We transform them into professional-quality images you&apos;ll be proud to share.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {transformations.map((item, idx) => (
            <div key={idx} className="group">
              <div className="flex items-center gap-3 mb-6">
                {/* Before */}
                <div className="flex-1 relative">
                  <div className="aspect-[4/5] relative rounded-xl overflow-hidden bg-secondary border border-border">
                    <NextImage
                      src={item.before.src}
                      alt={item.before.label}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                      sizes="(max-width: 768px) 40vw, 15vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-2">{item.before.label}</p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* After */}
                <div className="flex-1 relative">
                  <div className="aspect-[4/5] relative rounded-xl overflow-hidden bg-secondary border-2 border-primary/30 shadow-lg shadow-primary/10 group-hover:border-primary/50 transition-colors">
                    <NextImage
                      src={item.after.src}
                      alt={item.after.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 40vw, 15vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <p className="text-xs text-primary text-center mt-2 font-medium">{item.after.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

