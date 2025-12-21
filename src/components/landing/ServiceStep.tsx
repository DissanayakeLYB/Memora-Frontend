import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceStepProps {
  stepNumber: number;
  title: string;
  description: string;
  icon: LucideIcon;
  isLast?: boolean;
}

/**
 * ServiceStep - Displays a step in the service process
 * Clean, premium design with connecting line
 */
export function ServiceStep({ stepNumber, title, description, icon: Icon, isLast = false }: ServiceStepProps) {
  return (
    <div className="relative flex gap-6">
      {/* Step indicator and line */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-primary/40 to-border my-4" />
        )}
      </div>

      {/* Content */}
      <div className={cn("pb-10", isLast && "pb-0")}>
        <div className="text-xs font-medium text-primary mb-1 uppercase tracking-wider">
          Step {stepNumber}
        </div>
        <h3 className="text-xl font-medium text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
}

