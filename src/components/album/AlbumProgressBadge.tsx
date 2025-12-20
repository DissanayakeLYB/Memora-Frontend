import { Clock, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AlbumStatus } from "@/types";

interface AlbumProgressBadgeProps {
  status: AlbumStatus;
  className?: string;
  showLabel?: boolean;
}

/**
 * AlbumProgressBadge — Status indicator for album processing
 * 
 * States:
 * - submitted: Waiting to start
 * - in_progress: Currently processing
 * - completed: Ready to view
 * - failed: Something went wrong
 */
export function AlbumProgressBadge({
  status,
  className,
  showLabel = true,
}: AlbumProgressBadgeProps) {
  const config = {
    submitted: {
      icon: Clock,
      label: "Submitted",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      iconClass: "",
    },
    in_progress: {
      icon: Loader2,
      label: "In Progress",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      iconClass: "animate-spin",
    },
    completed: {
      icon: CheckCircle2,
      label: "Completed",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      iconClass: "",
    },
    failed: {
      icon: XCircle,
      label: "Failed",
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      iconClass: "",
    },
  };

  const { icon: Icon, label, color, bg, border, iconClass } = config[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border",
        bg,
        border,
        className
      )}
    >
      <Icon className={cn("w-4 h-4", color, iconClass)} />
      {showLabel && (
        <span className={cn("text-sm font-medium", color)}>{label}</span>
      )}
    </div>
  );
}

