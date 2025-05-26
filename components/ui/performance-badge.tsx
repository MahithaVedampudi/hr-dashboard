"use client";

import { Badge } from "@/components/ui/badge";
import { getPerformanceLevel, getRatingColor } from "@/lib/utils";

interface PerformanceBadgeProps {
  rating: number;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function PerformanceBadge({
  rating,
  showText = true,
  size = "md",
}: PerformanceBadgeProps) {
  const ratingColor = getRatingColor(rating);
  const performanceLevel = getPerformanceLevel(rating);
  
  const sizeClasses = {
    sm: "text-xs py-0 px-2",
    md: "text-sm py-0.5 px-2.5",
    lg: "text-md py-1 px-3",
  };

  return (
    <Badge 
      className={`font-semibold ${sizeClasses[size]}`}
      variant="outline"
    >
      <span className={`${ratingColor} w-2.5 h-2.5 rounded-full mr-1.5`}></span>
      {showText ? performanceLevel : `${rating.toFixed(1)}/5`}
    </Badge>
  );
}