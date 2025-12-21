"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  User, 
  Mail, 
  Loader2,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CategoryImageCard } from "@/components/request/CategoryImageCard";
import { ImageUploadZone } from "@/components/request/ImageUploadZone";
import { cn } from "@/lib/utils";
import { ROUTES, SERVICE_CATEGORIES } from "@/lib/constants";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

interface FormData {
  name: string;
  email: string;
  categories: string[];
  description: string;
}

const STEPS = [
  { id: 1, title: "Your Details", description: "Tell us who you are" },
  { id: 2, title: "Photo Type", description: "What are you looking for?" },
  { id: 3, title: "Your Photos", description: "Upload reference photos" },
  { id: 4, title: "Your Vision", description: "Describe what you want" },
];

/**
 * Service Request Page - Multi-step form for service intake
 * Premium, calm, trustworthy feel
 */
export default function RequestPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = React.useState<UploadedImage[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      categories: [],
      description: "",
    },
  });

  const watchedName = watch("name");
  const watchedEmail = watch("email");
  const watchedDescription = watch("description");

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const canProceed = React.useMemo(() => {
    switch (currentStep) {
      case 1:
        return watchedName.trim().length > 0 && 
               watchedEmail.trim().length > 0 && 
               /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail);
      case 2:
        return selectedCategories.length > 0;
      case 3:
        return uploadedImages.length >= 5;
      case 4:
        return watchedDescription.trim().length > 10;
      default:
        return false;
    }
  }, [currentStep, watchedName, watchedEmail, selectedCategories, uploadedImages, watchedDescription]);

  const handleNext = async () => {
    if (currentStep === 1) {
      const valid = await trigger(["name", "email"]);
      if (!valid) return;
    }
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Prepare the payload
    const payload = {
      name: data.name,
      email: data.email,
      categories: selectedCategories,
      description: data.description,
      referenceImages: uploadedImages.map((img) => ({
        name: img.file.name,
        size: img.file.size,
        type: img.file.type,
      })),
    };

    // Mock API call - in production, this would send to your backend
    console.log("Submitting request:", payload);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clean up previews
    uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));

    setIsSubmitting(false);
    router.push(ROUTES.THANK_YOU);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-wide max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-lg text-foreground mb-4">
            Request Your Photos
          </h1>
          <p className="text-lg text-muted-foreground">
            Tell us about yourself and what you&apos;re looking for. We&apos;ll take care of the rest.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {STEPS.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 font-medium text-sm",
                      currentStep > step.id
                        ? "bg-primary text-primary-foreground"
                        : currentStep === step.id
                        ? "bg-primary/20 text-primary border-2 border-primary"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-xs mt-2 hidden sm:block transition-colors",
                      currentStep === step.id
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </p>
                </div>
                {idx < STEPS.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-xl font-medium text-foreground mb-2">
                    Let&apos;s start with your details
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    We&apos;ll use this to keep you updated on your request.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Your Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-12 h-12"
                        {...register("name", { required: "Name is required" })}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-destructive text-sm">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-12 h-12"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-destructive text-sm">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Category Selection */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-xl font-medium text-foreground mb-2">
                    What are you looking for?
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Select all that apply. You can choose multiple options.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SERVICE_CATEGORIES.map((category) => (
                    <CategoryImageCard
                      key={category.id}
                      id={category.id}
                      label={category.label}
                      description={category.description}
                      image={category.image}
                      isSelected={selectedCategories.includes(category.id)}
                      onToggle={toggleCategory}
                    />
                  ))}
                </div>

                {selectedCategories.length > 0 && (
                  <p className="text-sm text-primary text-center">
                    {selectedCategories.length} option{selectedCategories.length !== 1 ? "s" : ""} selected
                  </p>
                )}
              </div>
            )}

            {/* Step 3: Photo Upload */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-xl font-medium text-foreground mb-2">
                    Upload your reference photos
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Share 5-10 photos of yourself. We&apos;ll use these to create authentic results.
                  </p>
                </div>

                <ImageUploadZone
                  images={uploadedImages}
                  onImagesChange={setUploadedImages}
                  minImages={5}
                  maxImages={10}
                />
              </div>
            )}

            {/* Step 4: Description */}
            {currentStep === 4 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-xl font-medium text-foreground mb-2">
                    Tell us about your vision
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Describe the photos you&apos;re dreaming of. The more detail, the better we can help.
                  </p>
                </div>

                <div className="space-y-4">
                  <Textarea
                    placeholder="Tell us anything important.
Mood, occasion, people involved, or special requests.

For example:
• I'd like a graduation photo in a cap and gown, outdoors with fall colors
• A professional headshot for LinkedIn with a neutral background
• A family portrait with my parents in a warm, cozy setting"
                    className="min-h-[200px] resize-none"
                    {...register("description", {
                      required: "Please describe what you're looking for",
                      minLength: {
                        value: 10,
                        message: "Please provide more detail",
                      },
                    })}
                  />
                  {errors.description && (
                    <p className="text-destructive text-sm">{errors.description.message}</p>
                  )}
                </div>

                {/* Summary */}
                <div className="p-5 rounded-xl bg-secondary/30 border border-border">
                  <h3 className="font-medium text-foreground mb-3">Request Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="text-foreground">{watchedName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="text-foreground">{watchedEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Categories:</span>
                      <span className="text-foreground">
                        {selectedCategories
                          .map((id) => SERVICE_CATEGORIES.find((c) => c.id === id)?.label)
                          .join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Photos:</span>
                      <span className="text-foreground">{uploadedImages.length} uploaded</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < STEPS.length ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!canProceed || isSubmitting}
                  className="gap-2 min-w-[160px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Trust footer */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Your information is secure and will only be used to process your request.
        </p>
      </div>
    </div>
  );
}

