"use client";

import { EmployeeList } from "@/components/employee/EmployeeList";
import { useBookmarks } from "@/context/BookmarkContext";
import { Card } from "@/components/ui/card";
import { Bookmark } from "lucide-react";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Bookmark className="mr-2 h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
      </div>
      
      <div className="space-y-6">
        {bookmarks.length === 0 ? (
          <Card className="p-8 flex flex-col items-center justify-center text-center">
            <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-1">No bookmarks yet</h2>
            <p className="text-muted-foreground max-w-md">
              You haven't bookmarked any employees yet. Browse the dashboard and click the bookmark icon to save employees here for quick access.
            </p>
          </Card>
        ) : (
          <EmployeeList 
            title={`${bookmarks.length} Bookmarked Employee${bookmarks.length !== 1 ? 's' : ''}`} 
            users={bookmarks} 
            showSearch={false} 
          />
        )}
      </div>
    </div>
  );
}