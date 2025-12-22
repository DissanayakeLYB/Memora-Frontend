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
    <section className="relative flex flex-col justify-center overflow-hidden py-[clamp(2rem,5vw,5rem)] min-h-[min(85vh,600px)]">
      {/* Elegant background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-[clamp(1.5rem,4vw,4rem)] items-center">
          {/* Left - Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Subtle service indicator */}
            <div className="inline-flex items-center gap-2 px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.375rem,1vw,0.5rem)] rounded-full bg-secondary/50 border border-border text-muted-foreground text-[clamp(0.75rem,2vw,0.875rem)] mb-[clamp(1rem,3vw,2rem)] animate-fade-in">
              <Camera className="w-[clamp(0.875rem,2vw,1rem)] h-[clamp(0.875rem,2vw,1rem)] text-primary" />
              <span>A done-for-you photo service</span>
            </div>

            {/* Main headline */}
            <h1 
              className="text-[clamp(1.75rem,6vw,3.75rem)] font-serif font-medium tracking-tight text-foreground mb-[clamp(0.75rem,2vw,1.5rem)] animate-fade-in-up leading-[1.1]"
              style={{ animationDelay: "100ms" }}
            >
              Get the photos you&apos;ve{" "}
              <span className="text-gradient-warm">wished</span>{" "}
              you had
            </h1>

            {/* How it works teaser */}
            <p 
              className="text-[clamp(0.875rem,2.5vw,1.25rem)] text-foreground/80 leading-relaxed mb-[clamp(1.5rem,4vw,2.5rem)] animate-fade-in-up max-w-xl mx-auto lg:mx-0"
              style={{ animationDelay: "280ms" }}
            >
              Upload your photos. Tell us what you want.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              We<span className="text-primary font-medium"> manually craft</span> photos for you.
            </p>

            {/* CTAs */}
            <div 
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-[clamp(0.5rem,2vw,1rem)] animate-fade-in-up"
              style={{ animationDelay: "360ms" }}
            >
              <Link href={ROUTES.REQUEST} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-[clamp(0.875rem,2vw,1rem)] px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(1rem,2.5vw,1.5rem)] group">
                  Request Your Photos
                  <ArrowRight className="w-[clamp(1rem,2.5vw,1.25rem)] h-[clamp(1rem,2.5vw,1.25rem)] ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#how-it-works" className="w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto text-[clamp(0.875rem,2vw,1rem)] px-[clamp(1rem,3vw,2rem)] py-[clamp(1rem,2.5vw,1.5rem)]">
                  How it works
                </Button>
              </Link>
            </div>
          </div>

          {/* Right - Before/After Transformation Showcase */}
          <div className="flex items-center justify-center gap-[clamp(0.75rem,3vw,2rem)] animate-fade-in order-1 lg:order-2 mb-6 lg:mb-0" style={{ animationDelay: "400ms" }}>
            {/* Previous Image - What you give us */}
            <div className="flex flex-col items-center">
              <div className="relative w-[clamp(100px,25vw,200px)] h-[clamp(125px,31.25vw,250px)] rounded-xl overflow-hidden bg-secondary border border-border shadow-lg">
                <NextImage
                  src="/resources/generatedImages/Before.jpeg"
                  alt="Previous photo - what you give us"
                  fill
                  className="object-cover"
                  sizes="(max-width: 360px) 100px, (max-width: 640px) 25vw, (max-width: 1024px) 180px, 200px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <p className="text-[clamp(0.625rem,1.5vw,0.875rem)] text-muted-foreground mt-[clamp(0.5rem,1.5vw,0.75rem)] font-medium text-center">What you give us</p>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0">
              <div className="w-[clamp(2rem,5vw,3rem)] h-[clamp(2rem,5vw,3rem)] rounded-full bg-primary/20 flex items-center justify-center">
                <ArrowRight className="w-[clamp(1rem,2.5vw,1.5rem)] h-[clamp(1rem,2.5vw,1.5rem)] text-primary" />
              </div>
            </div>

            {/* After Image - What we give back */}
            <div className="flex flex-col items-center">
              <div className="relative w-[clamp(100px,25vw,200px)] h-[clamp(125px,31.25vw,250px)] rounded-xl overflow-hidden bg-secondary border-2 border-primary/50 shadow-xl shadow-primary/20">
                <NextImage
                  src="/resources/generatedImages/Generated_image_0004.png"
                  alt="After photo - what we give back"
                  fill
                  className="object-cover"
                  sizes="(max-width: 360px) 100px, (max-width: 640px) 25vw, (max-width: 1024px) 180px, 200px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
              <p className="text-[clamp(0.625rem,1.5vw,0.875rem)] text-primary mt-[clamp(0.5rem,1.5vw,0.75rem)] font-medium text-center">What we give back</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
