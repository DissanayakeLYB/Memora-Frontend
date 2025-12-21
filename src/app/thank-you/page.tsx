import Link from "next/link";
import { CheckCircle, Mail, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

/**
 * Thank You Page - Calm confirmation after request submission
 * Sets expectations and provides reassurance
 */
export default function ThankYouPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16">
      <div className="container-wide max-w-2xl mx-auto text-center">
        {/* Success icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-8 animate-scale-in">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>

        {/* Main message */}
        <h1 className="heading-lg text-foreground mb-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          We&apos;ve received your request
        </h1>
        
        <p className="text-xl text-muted-foreground mb-10 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          Thank you for trusting us with your photos. We&apos;ll take it from here.
        </p>

        {/* What happens next */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-10 text-left animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <h2 className="font-medium text-foreground text-lg mb-6 text-center">
            What happens next
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">
                  We&apos;ll review your request personally
                </h3>
                <p className="text-muted-foreground text-sm">
                  A real person will look at your photos and requirements to understand exactly what you&apos;re looking for.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">
                  You&apos;ll hear from us soon
                </h3>
                <p className="text-muted-foreground text-sm">
                  We typically respond within 1-2 business days to discuss your project and answer any questions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reassurance */}
        <div className="mb-10 p-6 rounded-xl bg-secondary/30 border border-border animate-fade-in" style={{ animationDelay: "400ms" }}>
          <p className="text-muted-foreground italic">
            &ldquo;We handle every request with care. Your photos are safe with us, and we&apos;re genuinely excited to help bring your vision to life.&rdquo;
          </p>
          <p className="text-sm text-primary mt-3">— The Memora Team</p>
        </div>

        {/* Back to home */}
        <Link href={ROUTES.HOME}>
          <Button variant="ghost" size="lg" className="gap-2 animate-fade-in" style={{ animationDelay: "500ms" }}>
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

