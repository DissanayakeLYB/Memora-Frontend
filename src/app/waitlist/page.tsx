"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Sparkles, Gift, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";

interface WaitlistFormData {
  name: string;
  email: string;
}

/**
 * Waitlist Page — Pre-register for early access
 * 
 * Design: Exciting but calm, emphasizes the exclusive benefits
 */
export default function WaitlistPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormData>();

  const onSubmit = async (data: WaitlistFormData) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call - replace with real waitlist API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Log the submission (replace with actual API call)
      console.log("Waitlist signup:", data);
      
      setIsSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
            <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-foreground mb-3">
            You&apos;re on the list!
          </h1>
          <p className="text-muted-foreground mb-4">
            Thank you for joining our waitlist. We&apos;ll notify you as soon as Memora is ready.
          </p>
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl mb-8">
            <div className="flex items-center justify-center gap-2 text-primary mb-2">
              <Gift className="w-5 h-5" />
              <span className="font-medium">Your Early Access Bonus</span>
            </div>
            <p className="text-sm text-foreground/80">
              You&apos;ve secured <strong>5 extra credits</strong> to try out when we launch!
            </p>
          </div>
          <Link href={ROUTES.HOME}>
            <Button variant="secondary">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Hero section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Coming Soon</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Get Early Access to Memora
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Be among the first to transform your cherished photos into beautiful albums. 
            Join our waitlist and unlock exclusive benefits.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="p-4 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Gift className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium text-foreground">5 Extra Credits</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Get 5 extra photos to try out when you join early
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium text-foreground">Priority Access</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Be first in line when we open our doors
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Join the Waitlist</CardTitle>
            <CardDescription>
              We&apos;ll let you know when Memora is ready for you
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Error message */}
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  error={!!errors.name}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  error={!!errors.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Join Waitlist
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By joining, you agree to our{" "}
                <Link href={ROUTES.PRIVACY} className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                . We&apos;ll only email you about Memora updates.
              </p>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}

