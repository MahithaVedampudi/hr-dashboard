"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Rating } from "@/components/ui/rating";
import { departments } from "@/lib/utils";
import { Search, X, SlidersHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface EmployeeSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDepartments: string[];
  setSelectedDepartments: (departments: string[]) => void;
  selectedRatings: number[];
  setSelectedRatings: (ratings: number[]) => void;
}

export function EmployeeSearch({
  searchTerm,
  setSearchTerm,
  selectedDepartments,
  setSelectedDepartments,
  selectedRatings,
  setSelectedRatings,
}: EmployeeSearchProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    // Update local search term when the prop changes
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm("");
    setSearchTerm("");
  };

  const handleDepartmentToggle = (department: string) => {
    setSelectedDepartments(
      selectedDepartments.includes(department)
        ? selectedDepartments.filter((d) => d !== department)
        : [...selectedDepartments, department]
    );
  };

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings(
      selectedRatings.includes(rating)
        ? selectedRatings.filter((r) => r !== rating)
        : [...selectedRatings, rating]
    );
  };

  const clearAllFilters = () => {
    setSelectedDepartments([]);
    setSelectedRatings([]);
    setSearchTerm("");
    setLocalSearchTerm("");
  };

  const hasActiveFilters =
    selectedDepartments.length > 0 || selectedRatings.length > 0 || searchTerm !== "";

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex-1 flex items-center"
        >
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email or department..."
            className="pl-9 pr-9"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
          />
          {localSearchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </form>

        <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={hasActiveFilters ? "default" : "outline"}
              className="gap-1.5"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 rounded-full bg-primary-foreground text-primary w-5 h-5 flex items-center justify-center text-xs font-medium">
                  {selectedDepartments.length + selectedRatings.length + (searchTerm ? 1 : 0)}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Department</h3>
                <div className="grid grid-cols-2 gap-2">
                  {departments.map((department) => (
                    <div key={department} className="flex items-center space-x-2">
                      <Checkbox
                        id={`department-${department}`}
                        checked={selectedDepartments.includes(department)}
                        onCheckedChange={() => handleDepartmentToggle(department)}
                      />
                      <label
                        htmlFor={`department-${department}`}
                        className="text-sm"
                      >
                        {department}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Performance Rating</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={selectedRatings.includes(rating)}
                        onCheckedChange={() => handleRatingToggle(rating)}
                      />
                      <label htmlFor={`rating-${rating}`} className="flex items-center">
                        <Rating value={rating} max={rating} size="sm" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  disabled={!hasActiveFilters}
                >
                  Clear all
                </Button>
                <Button size="sm" onClick={() => setFiltersOpen(false)}>
                  Apply filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}