import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "default" | "sm" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

/**
 * PrimaryButton — Memora's main action button
 * 
 * Design: Warm amber with subtle glow, calming hover states
 * Used for CTAs throughout the app
 */
export function PrimaryButton({
  variant = "default",
  size = "default",
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: PrimaryButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: "bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 focus:ring-primary active:scale-[0.98]",
    secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 focus:ring-ring",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary/50 focus:ring-ring",
    outline: "border border-border bg-transparent text-foreground hover:bg-secondary focus:ring-ring",
  };
  
  const sizes = {
    default: "h-11 px-6 text-sm",
    sm: "h-9 px-4 text-xs",
    lg: "h-12 px-8 text-base",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

