"use client";

import Link from "next/link";
import NextImage from "next/image";
import { ArrowRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

/**
 * HeroSection - Clean, focused hero with single transformation example
 * Mobile-first responsive design
 */
export function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden py-12 sm:py-16 lg:py-20 lg:min-h-[85vh]">
      {/* Elegant background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <div className="text-center lg:text-left">
            {/* Subtle service indicator */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary/50 border border-border text-muted-foreground text-xs sm:text-sm mb-6 sm:mb-8 animate-fade-in">
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span>A done-for-you photo service</span>
            </div>

            {/* Main headline */}
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-foreground mb-4 sm:mb-6 animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              Get the photos you&apos;ve{" "}
              <span className="text-gradient-warm">wished</span>{" "}
              you had
            </h1>

            {/* How it works teaser */}
            <p 
              className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed mb-8 sm:mb-10 animate-fade-in-up max-w-xl mx-auto lg:mx-0"
              style={{ animationDelay: "280ms" }}
            >
              Upload your photos. Tell us what you want.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              We<span className="text-primary font-medium"> manually craft</span> photos for you.
            </p>

            {/* CTAs */}
            <div 
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4 animate-fade-in-up"
              style={{ animationDelay: "360ms" }}
            >
              <Link href={ROUTES.REQUEST} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 sm:px-10 py-5 sm:py-6 group">
                  Request Your Photos
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#how-it-works" className="w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto text-base px-6 sm:px-8 py-5 sm:py-6">
                  How it works
                </Button>
              </Link>
            </div>
          </div>

          {/* Right - Single Before/After Transformation (hidden on mobile) */}
          <div className="hidden sm:block animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
              {/* Before */}
              <div className="flex flex-col items-center">
                <div className="w-[110px] sm:w-[140px] md:w-[180px] lg:w-[200px] aspect-[4/5] relative rounded-lg sm:rounded-xl overflow-hidden bg-secondary border border-border shadow-lg">
                  <NextImage
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop"
                    alt="Your photo"
                    fill
                    className="object-cover opacity-85"
                    sizes="(max-width: 640px) 110px, (max-width: 768px) 140px, 200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3 font-medium">What you give us</p>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                </div>
              </div>

              {/* After */}
              <div className="flex flex-col items-center">
                <div className="w-[110px] sm:w-[140px] md:w-[180px] lg:w-[200px] aspect-[4/5] relative rounded-lg sm:rounded-xl overflow-hidden bg-secondary border-2 border-primary/50 shadow-xl shadow-primary/20">
                  <NextImage
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop"
                    alt="Professional result"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 110px, (max-width: 768px) 140px, 200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <p className="text-xs sm:text-sm text-primary mt-2 sm:mt-3 font-medium">What we give back</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
