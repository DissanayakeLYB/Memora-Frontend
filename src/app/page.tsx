import Link from "next/link";
import NextImage from "next/image";
import {
  Heart,
  Camera,
  Users,
  Briefcase,
  GraduationCap,
  Shield,
  Eye,
  HandHeart,
  Palette,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { HeroSection, StyleShowcase } from "@/components/landing";

// Gallery images for various sections
const showcaseImages = [
  "/resources/generatedImages/carousel-section/0006.png",
  "/resources/generatedImages/carousel-section/0014.png",
  "/resources/generatedImages/carousel-section/0015.png",
  "/resources/generatedImages/carousel-section/0002.png",
  "/resources/generatedImages/carousel-section/0041.png",
  "/resources/generatedImages/carousel-section/0004.png",
  "/resources/generatedImages/carousel-section/0043.png",
  "/resources/generatedImages/carousel-section/0017.png",
  "/resources/generatedImages/carousel-section/0003.png",
  "/resources/generatedImages/carousel-section/0007.png",
  "/resources/generatedImages/carousel-section/0009.png",
  "/resources/generatedImages/carousel-section/0008.png",
  "/resources/generatedImages/carousel-section/0049.png",
  "/resources/generatedImages/carousel-section/0016.png",
  "/resources/generatedImages/carousel-section/0019.png",
  "/resources/generatedImages/carousel-section/0022.png",
  "/resources/generatedImages/carousel-section/0029.png",
  "/resources/generatedImages/carousel-section/0031.png",
  "/resources/generatedImages/carousel-section/0023.png",
  "/resources/generatedImages/carousel-section/0034.png",
  "/resources/generatedImages/carousel-section/0025.png",
  "/resources/generatedImages/carousel-section/0035.png",
  "/resources/generatedImages/carousel-section/0039.png",
  "/resources/generatedImages/carousel-section/0042.png",
  "/resources/generatedImages/carousel-section/0040.png",
];

const resultImages = [
  {
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=400&fit=crop",
    label: "Professional",
  },
  {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
    label: "Graduation",
  },
  {
    src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop",
    label: "Family",
  },
  {
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=400&fit=crop",
    label: "Creative",
  },
];

/**
 * Landing Page — Premium, calm, trust-building
 * Emphasizes Memora as a done-for-you service, not a DIY AI tool
 */
export default function HomePage() {
  const painPoints = [
    {
      icon: Camera,
      title: "I hate posing in front of people",
      description:
        "No awkward photo sessions. No forcing smiles. Just beautiful photos that look natural and relaxed.",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=400&fit=crop",
    },
    {
      icon: GraduationCap,
      title: "I never got proper graduation photos",
      description:
        "Life happens. We can help you capture those milestone moments, even after they've passed.",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=400&fit=crop",
    },
    {
      icon: Heart,
      title: "We lost someone important",
      description:
        "Preserve memories with sensitivity and care. We handle these requests with the respect they deserve.",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=400&fit=crop",
    },
    {
      icon: Briefcase,
      title: "Photography is too expensive",
      description:
        "Professional results without the professional price tag. Quality photos accessible to everyone.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop",
    },
    {
      icon: Users,
      title: "I couldn't attend the event",
      description:
        "Missed a wedding, reunion, or celebration? We can help create the photos you wish you had.",
      image:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=400&fit=crop",
    },
    {
      icon: Palette,
      title: "I want something creative",
      description:
        "Artistic visions brought to life. From editorial looks to fantasy settings — tell us your dream.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop",
    },
  ];

  // Simple 3-step process - emphasizing done-for-you service
  const serviceSteps = [
    {
      step: "1",
      title: "You submit",
      description: "Upload your photos and tell us what you want.",
    },
    {
      step: "2",
      title: "We create",
      description: "Our team personally crafts your images with care.",
    },
    {
      step: "3",
      title: "You receive",
      description: "Your finished photos, delivered within 3 days.",
    },
  ];

  const differentiators = [
    {
      icon: Eye,
      title: "Human-reviewed results",
      description:
        "Every photo is personally reviewed by our team before delivery.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    },
    {
      icon: Shield,
      title: "Privacy-first approach",
      description: "Your photos are yours. We never share or sell them.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop",
    },
    {
      icon: HandHeart,
      title: "Emotionally sensitive",
      description: "We handle every request with care and respect.",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop",
    },
    {
      icon: Palette,
      title: "Crafted, not generated",
      description: "Each result is thoughtfully created for your vision.",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop",
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section with Before/After Showcase */}
      <HeroSection />

      {/* Floating Image Gallery Strip */}
      <section className="py-6 border-t border-border overflow-hidden bg-secondary/30">
        <div className="flex animate-marquee gap-4">
          {[...showcaseImages, ...showcaseImages].map((src, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[120px] sm:w-[150px] aspect-[4/5] relative rounded-lg overflow-hidden"
            >
              <NextImage
                src={src}
                alt={`Showcase ${idx + 1}`}
                fill
                className="object-cover"
                sizes="150px"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Style Gallery */}
      <StyleShowcase />

      {/* Pain Points Section - With Images */}
      <section className="py-24 border-t border-border bg-secondary/20">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-foreground mb-4">
              We understand why you&apos;re here
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Life doesn&apos;t always give us the photos we want. Whatever
              brought you here, we&apos;re ready to help.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {painPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <NextImage
                      src={point.image}
                      alt={point.title}
                      fill
                      className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/95 to-card/80" />
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-foreground mb-2 text-lg">
                      &ldquo;{point.title}&rdquo;
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Gallery */}
      <section className="py-24 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-14">
            <h2 className="heading-lg text-foreground mb-4">
              Results that speak for themselves
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every photo is crafted with care. Here&apos;s what we deliver.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {resultImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative aspect-[3/2] rounded-xl overflow-hidden"
              >
                <NextImage
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-white text-sm font-medium">
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Simple & Clear */}
      <section
        id="how-it-works"
        className="py-20 border-t border-border bg-secondary/20"
      >
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg text-foreground mb-4">How it works</h2>
            <p className="text-lg text-muted-foreground mb-12">
              This is a{" "}
              <span className="text-foreground font-medium">
                done-for-you service
              </span>
              . You request, we deliver.
            </p>

            {/* 3 Simple Steps */}
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {serviceSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="relative p-6 rounded-2xl bg-card border border-border"
                >
                  {/* Step number */}
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-lg mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>

                  {/* Arrow between steps */}
                  {idx < serviceSteps.length - 1 && (
                    <div className="hidden sm:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Key message */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">
                Delivered within 3 days
              </span>
            </div>

            <div className="block">
              <Link href={ROUTES.REQUEST}>
                <Button size="lg" className="group">
                  Start Your Request
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Memora Section - Visual Cards */}
      <section className="py-24 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-foreground mb-4">
              Why people trust Memora
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;re not just another AI tool. We&apos;re a team that cares
              about getting your photos right.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {differentiators.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-2xl overflow-hidden"
                >
                  {/* Background Image */}
                  <div className="aspect-[4/3] relative">
                    <NextImage
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-medium text-white text-base mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promise Section with Image */}
      <section className="py-24 border-t border-border bg-secondary/20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left - Large Feature Image */}
              <div className="relative">
                <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                  <NextImage
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1000&fit=crop"
                    alt="Beautiful result"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-lg">
                  <p className="text-sm font-medium">Crafted with care</p>
                </div>
              </div>

              {/* Right - Promise */}
              <div>
                <h2 className="heading-lg text-foreground mb-6">
                  Our promise to you
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">
                        Personal attention.
                      </span>{" "}
                      Every request is handled individually, never processed in
                      bulk.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">
                        Complete privacy.
                      </span>{" "}
                      Your photos are deleted after delivery unless you ask us
                      to keep them.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">
                        Honest communication.
                      </span>{" "}
                      We&apos;ll tell you upfront if we can&apos;t deliver what
                      you&apos;re looking for.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">
                        Quality you can trust.
                      </span>{" "}
                      We don&apos;t send anything we wouldn&apos;t be proud of
                      ourselves.
                    </p>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="mt-8 p-6 rounded-xl bg-card border border-border">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-primary fill-primary"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground italic mb-4 leading-relaxed">
                    &ldquo;I never thought I&apos;d have a graduation photo
                    after missing my ceremony. The team at Memora created
                    something beautiful.&rdquo;
                  </p>
                  <p className="text-muted-foreground text-sm">
                    — Sarah M., Class of 2023
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Background Images */}
      <section className="py-24 border-t border-border relative overflow-hidden">
        {/* Background image collage */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-1/3 h-1/2">
            <NextImage
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
              alt=""
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-1/2">
            <NextImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
              alt=""
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
          <div className="absolute bottom-0 left-1/4 w-1/3 h-1/2">
            <NextImage
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop"
              alt=""
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
        </div>

        <div className="container-wide relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-lg text-foreground mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Tell us about the photos you&apos;re dreaming of. We&apos;ll take
              it from there.
            </p>
            <Link href={ROUTES.REQUEST}>
              <Button size="lg" className="text-base px-12 py-6 group">
                Request Your Photos
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-6">
              No commitment. We&apos;ll review your request and get back to you
              personally.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
