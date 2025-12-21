import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhyMemoraCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

/**
 * WhyMemoraCard - Differentiator card showing why Memora is unique
 * Premium feel with soft design
 */
export function WhyMemoraCard({ icon: Icon, title, description, className }: WhyMemoraCardProps) {
  return (
    <div 
      className={cn(
        "p-8 rounded-2xl bg-gradient-to-b from-secondary/50 to-card/30 border border-border",
        "hover:border-primary/20 transition-all duration-300",
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="font-medium text-foreground text-lg mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

