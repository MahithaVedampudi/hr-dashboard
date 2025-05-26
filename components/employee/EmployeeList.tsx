"use client";

import { User } from "@/lib/types";
import { EmployeeCard } from "@/components/employee/EmployeeCard";
import { EmployeeSearch } from "@/components/employee/EmployeeSearch";
import { useUsers } from "@/hooks/useUsers";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface EmployeeListProps {
  title?: string;
  users?: User[];
  showSearch?: boolean;
}

export function EmployeeList({ title, users, showSearch = true }: EmployeeListProps) {
  const {
    filteredUsers,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings
  } = useUsers();

  const displayUsers = users || filteredUsers;

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6">
        {showSearch && (
          <Skeleton className="h-10 w-full" />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <div className="mt-4">
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="mt-4 flex justify-between">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive">
        <CardContent className="p-6">
          <p className="text-center text-destructive">
            Error loading employees: {error}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {showSearch && (
        <EmployeeSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDepartments={selectedDepartments}
          setSelectedDepartments={setSelectedDepartments}
          selectedRatings={selectedRatings}
          setSelectedRatings={setSelectedRatings}
        />
      )}
      
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">
            {displayUsers.length} employees
          </p>
        </div>
      )}

      {displayUsers.length === 0 ? (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <p className="text-muted-foreground">No employees found</p>
            {(searchTerm !== "" || selectedDepartments.length > 0 || selectedRatings.length > 0) && (
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your search or filters
              </p>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayUsers.map((user) => (
            <EmployeeCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}