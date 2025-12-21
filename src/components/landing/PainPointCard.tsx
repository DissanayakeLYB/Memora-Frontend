import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PainPointCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

/**
 * PainPointCard - Displays a relatable pain point that Memora solves
 * Uses human, emotional language - not tech speak
 */
export function PainPointCard({ icon: Icon, title, description, className }: PainPointCardProps) {
  return (
    <div 
      className={cn(
        "group p-6 rounded-2xl bg-card/50 border border-border",
        "hover:border-primary/30 hover:bg-card transition-all duration-300",
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-medium text-foreground mb-2 text-lg">
        &ldquo;{title}&rdquo;
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

