import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Shield, Sparkles, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

/**
 * Landing Page — The first impression of Memora
 * 
 * Design philosophy:
 * - Calm, minimal, emotionally resonant
 * - Focus on memories, not AI technology
 * - Build trust through warmth
 * - No buzzwords, no flashy effects
 */
export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container-wide relative z-10 py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8 animate-fade-in">
              <Heart className="w-4 h-4 fill-current" />
              <span>A new way to cherish memories</span>
            </div>

            {/* Headline */}
            <h1 className="heading-xl text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              Your memories deserve
              <br />
              <span className="text-gradient-warm">more than a folder</span>
            </h1>

            {/* Subheadline */}
            <p className="body-lg max-w-xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              Memora transforms your cherished photos into beautiful, personalized albums. 
              No complicated tools. Just show us what you love.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <Link href={ROUTES.REGISTER}>
                <Button size="lg" className="text-base px-8">
                  Create Your Album
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href={ROUTES.LOGIN}>
                <Button variant="ghost" size="lg" className="text-base">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-foreground mb-4">
              Simple. Visual. Yours.
            </h2>
            <p className="body-md max-w-2xl mx-auto">
              No need to describe what you want in words. Just pick what resonates, 
              share your photos, and let us create something beautiful.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-serif font-medium text-foreground mb-2">
                Choose Your Style
              </h3>
              <p className="text-sm text-muted-foreground">
                Browse sample images and pick the ones that feel right. 
                No descriptions needed.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Camera className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-serif font-medium text-foreground mb-2">
                Share Your Photos
              </h3>
              <p className="text-sm text-muted-foreground">
                Upload the photos you have. We work with what you can share, 
                however many that is.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-serif font-medium text-foreground mb-2">
                Receive Your Album
              </h3>
              <p className="text-sm text-muted-foreground">
                We carefully craft your album and notify you when it&apos;s ready. 
                Download and treasure forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 border-t border-border bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-800/30 to-stone-900" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-foreground font-serif text-lg">
                      Your memories are safe with us
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h2 className="heading-md text-foreground mb-6">
                  Built on trust, not trends
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We understand that your photos hold irreplaceable moments. 
                    That&apos;s why privacy and respect are at the core of everything we do.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      </span>
                      <span>Your photos are never shared with third parties</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      </span>
                      <span>Secure, encrypted storage for all your uploads</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      </span>
                      <span>Delete your data anytime, no questions asked</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t border-border">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-lg text-foreground mb-6">
              Ready to create something beautiful?
            </h2>
            <p className="body-md mb-10">
              Start with just a few photos. We&apos;ll help you turn them into 
              memories worth keeping forever.
            </p>
            <Link href={ROUTES.REGISTER}>
              <Button size="lg" className="text-base px-8">
                Create Your Album
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
