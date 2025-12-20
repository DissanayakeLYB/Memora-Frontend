"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Check, AlertCircle, Sparkles } from "lucide-react";
import { PrimaryButton } from "@/components/ui";
import { ImageStyleGrid, UploadDropzone } from "@/components/album";
import { createAlbum, isAuthenticated } from "@/lib/api";
import { getStyleById, validateStyleSelection } from "@/lib/imageStyles";
import { ROUTES, ALBUM_CREATION_STEPS, MAX_PHOTOS_PER_ALBUM } from "@/lib/constants";
import type { AlbumFormData, AlbumCreationStep } from "@/types";

/**
 * Create Album Page — Multi-step album creation flow
 * 
 * Steps:
 * 1. Album Details (title, description)
 * 2. Visual Style Selection (1-3 sample images)
 * 3. Photo Upload (up to 10 photos)
 * 4. Review & Submit
 * 
 * Design philosophy:
 * - Calm, step-by-step guidance
 * - No overwhelming forms
 * - Clear progress indication
 * - Gentle validation
 */
export default function CreateAlbumPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState<AlbumCreationStep>(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [createdAlbumId, setCreatedAlbumId] = React.useState<string | null>(null);

  // Form state
  const [formData, setFormData] = React.useState<AlbumFormData>({
    title: "",
    description: "",
    selectedStyleIds: [],
    photos: [],
  });

  // Check auth on mount
  React.useEffect(() => {
    if (!isAuthenticated()) {
      router.push(ROUTES.LOGIN);
    }
  }, [router]);

  // Validation per step
  const getStepValidation = (step: AlbumCreationStep) => {
    switch (step) {
      case 1:
        return {
          isValid: formData.title.trim().length > 0,
          error: formData.title.trim().length === 0 ? "Please give your album a title" : "",
        };
      case 2: {
        const styleValidation = validateStyleSelection(formData.selectedStyleIds);
        return {
          isValid: styleValidation.valid,
          error: styleValidation.error || "",
        };
      }
      case 3:
        return {
          isValid: formData.photos.length > 0 && formData.photos.length <= MAX_PHOTOS_PER_ALBUM,
          error: formData.photos.length === 0 
            ? "Please upload at least one photo" 
            : formData.photos.length > MAX_PHOTOS_PER_ALBUM 
              ? `Maximum ${MAX_PHOTOS_PER_ALBUM} photos allowed`
              : "",
        };
      case 4:
        // All previous steps must be valid
        return {
          isValid: 
            formData.title.trim().length > 0 &&
            formData.selectedStyleIds.length >= 1 &&
            formData.selectedStyleIds.length <= 3 &&
            formData.photos.length > 0 &&
            formData.photos.length <= MAX_PHOTOS_PER_ALBUM,
          error: "",
        };
      default:
        return { isValid: true, error: "" };
    }
  };

  const currentValidation = getStepValidation(currentStep);
  const canProceed = currentValidation.isValid;

  const handleNext = () => {
    if (canProceed && currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as AlbumCreationStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as AlbumCreationStep);
    }
  };

  const handleSubmit = async () => {
    if (!getStepValidation(4).isValid) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await createAlbum(formData);

      if (response.success && response.data) {
        setSubmitSuccess(true);
        setCreatedAlbumId(response.data.id);
      } else {
        setSubmitError(response.error || "Failed to create album. Please try again.");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitSuccess && createdAlbumId) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-foreground mb-3">
            Album Created
          </h1>
          <p className="text-muted-foreground mb-8">
            Your album has been submitted. We&apos;ll take good care of your memories
            and notify you when it&apos;s ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={ROUTES.ALBUM(createdAlbumId)}>
              <PrimaryButton>View Album</PrimaryButton>
            </Link>
            <Link href={ROUTES.DASHBOARD}>
              <PrimaryButton variant="secondary">Go to Dashboard</PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-180px)]">
      {/* Progress Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-16 z-10">
        <div className="container-wide py-4">
          {/* Step indicators */}
          <div className="flex items-center justify-between mb-2">
            {ALBUM_CREATION_STEPS.map((step, index) => {
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              const isClickable = step.number < currentStep;

              return (
                <button
                  key={step.number}
                  onClick={() => isClickable && setCurrentStep(step.number as AlbumCreationStep)}
                  disabled={!isClickable}
                  className={`
                    flex items-center gap-2 group
                    ${isClickable ? "cursor-pointer" : "cursor-default"}
                  `}
                >
                  {/* Step number/check */}
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    transition-all duration-200
                    ${isCompleted 
                      ? "bg-primary text-primary-foreground" 
                      : isActive 
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/30" 
                        : "bg-secondary text-muted-foreground"
                    }
                    ${isClickable ? "group-hover:bg-primary/80" : ""}
                  `}>
                    {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                  </div>
                  
                  {/* Step title (hidden on mobile) */}
                  <span className={`
                    hidden md:block text-sm
                    ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}
                    ${isClickable ? "group-hover:text-foreground" : ""}
                  `}>
                    {step.title}
                  </span>

                  {/* Connector line */}
                  {index < ALBUM_CREATION_STEPS.length - 1 && (
                    <div className={`
                      hidden sm:block w-8 lg:w-16 h-0.5 mx-2
                      ${currentStep > step.number ? "bg-primary" : "bg-secondary"}
                    `} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Current step description (mobile) */}
          <p className="text-sm text-muted-foreground md:hidden">
            Step {currentStep}: {ALBUM_CREATION_STEPS[currentStep - 1].title}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-wide py-8">
        {/* Step 1: Album Details */}
        {currentStep === 1 && (
          <div className="max-w-xl mx-auto animate-fade-in">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-serif text-foreground mb-2">
                Tell us about your album
              </h1>
              <p className="text-muted-foreground">
                Give your album a name and share a bit about the memories you want to preserve.
              </p>
            </div>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                  Album Title <span className="text-primary">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Sarah's Graduation Day"
                  className="
                    w-full px-4 py-3 rounded-lg
                    bg-secondary/50 border border-input
                    text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                    transition-all duration-150
                  "
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  Description <span className="text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us about this moment. What makes it special? Who is in the photos?"
                  rows={4}
                  className="
                    w-full px-4 py-3 rounded-lg
                    bg-secondary/50 border border-input
                    text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                    transition-all duration-150
                    resize-none
                  "
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  The more context you share, the better we can preserve your story.
                </p>
              </div>

              {/* Privacy note */}
              <div className="p-4 bg-secondary/50 border border-border rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Your privacy matters.</span>{" "}
                  Your photos and personal information are handled with care and respect.
                  We never share your data with third parties.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Style Selection */}
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <div className="mb-8 text-center max-w-2xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-serif text-foreground mb-2">
                Choose your visual style
              </h1>
              <p className="text-muted-foreground">
                Select 1–3 images that capture the feeling you want for your album.
                Don&apos;t worry about finding the perfect words — just pick what resonates.
              </p>
            </div>

            <ImageStyleGrid
              selectedIds={formData.selectedStyleIds}
              onSelectionChange={(ids) => setFormData({ ...formData, selectedStyleIds: ids })}
              maxSelections={3}
            />
          </div>
        )}

        {/* Step 3: Photo Upload */}
        {currentStep === 3 && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-serif text-foreground mb-2">
                Upload your photos
              </h1>
              <p className="text-muted-foreground">
                Share the photos you have — even just a few. We work with what you can share.
              </p>
            </div>

            <UploadDropzone
              photos={formData.photos}
              onChange={(photos) => setFormData({ ...formData, photos })}
              maxPhotos={MAX_PHOTOS_PER_ALBUM}
              maxSizeMB={5}
            />
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-serif text-foreground mb-2">
                Review your album
              </h1>
              <p className="text-muted-foreground">
                Take a moment to review your selections before submitting.
              </p>
            </div>

            <div className="space-y-6">
              {/* Album Details */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-serif text-foreground">Album Details</h2>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground font-medium">{formData.title}</p>
                  {formData.description && (
                    <p className="text-muted-foreground text-sm">{formData.description}</p>
                  )}
                </div>
              </div>

              {/* Selected Styles */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-serif text-foreground">
                    Selected Styles ({formData.selectedStyleIds.length})
                  </h2>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {formData.selectedStyleIds.map((id) => {
                    const style = getStyleById(id);
                    if (!style) return null;
                    return (
                      <div key={id} className="aspect-[4/3] bg-secondary rounded-lg overflow-hidden relative">
                        <Image
                          src={style.imageUrl}
                          alt={style.label}
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                          <span className="text-xs text-white">{style.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Uploaded Photos */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-serif text-foreground">
                    Photos ({formData.photos.length})
                  </h2>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {formData.photos.slice(0, 10).map((photo, index) => (
                    <div key={index} className="aspect-square bg-secondary rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Error */}
              {submitError && (
                <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{submitError}</p>
                </div>
              )}

              {/* What happens next */}
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm text-foreground/80">
                  <span className="font-medium">What happens next?</span>{" "}
                  Once you submit, we&apos;ll carefully process your photos and create your album.
                  This typically takes 24-48 hours. You&apos;ll be notified when it&apos;s ready.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between max-w-3xl mx-auto">
          {/* Back button */}
          {currentStep > 1 ? (
            <PrimaryButton variant="ghost" onClick={handleBack}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </PrimaryButton>
          ) : (
            <Link href={ROUTES.DASHBOARD}>
              <PrimaryButton variant="ghost">
                Cancel
              </PrimaryButton>
            </Link>
          )}

          {/* Next/Submit button */}
          {currentStep < 4 ? (
            <PrimaryButton onClick={handleNext} disabled={!canProceed}>
              Continue
              <ChevronRight className="w-4 h-4 ml-1" />
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={handleSubmit}
              disabled={!canProceed || isSubmitting}
              isLoading={isSubmitting}
            >
              Create Album
            </PrimaryButton>
          )}
        </div>

        {/* Validation hint */}
        {!canProceed && currentValidation.error && (
          <p className="text-center text-sm text-primary mt-4 max-w-3xl mx-auto">
            {currentValidation.error}
          </p>
        )}
      </div>
    </div>
  );
}
