"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  size = "md",
  readOnly = true,
  onChange,
  className,
}: RatingProps) {
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleClick = (newValue: number) => {
    if (!readOnly && onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={cn("flex", className)}>
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          type="button"
          className={cn(
            "p-0.5 focus:outline-none",
            !readOnly && "cursor-pointer hover:scale-110 transition-transform"
          )}
          onClick={() => handleClick(i + 1)}
          disabled={readOnly}
          aria-label={`${i + 1} stars`}
        >
          <Star
            className={cn(
              sizeClasses[size],
              i < value
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted"
            )}
          />
        </button>
      ))}
    </div>
  );
}