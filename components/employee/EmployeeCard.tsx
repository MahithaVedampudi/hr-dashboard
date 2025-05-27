"use client";

import { User } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { PerformanceBadge } from "@/components/ui/performance-badge";
import { useBookmarks } from "@/context/BookmarkContext";
import { Bookmark, Eye, ArrowUpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface EmployeeCardProps {
  user: User;
  onPromote?: (userId: string) => void; 
}

export function EmployeeCard({ user, onPromote }: EmployeeCardProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const bookmarked = isBookmarked(user.id);
  const { toast } = useToast();
  const [promoting, setPromoting] = useState(false);
  const [currentRating, setCurrentRating] = useState(user.performanceRating || 0);

  const handleBookmarkToggle = () => {
    if (bookmarked) {
      removeBookmark(user.id);
      toast({
        title: "Removed from bookmarks",
        description: `${user.firstName} ${user.lastName} has been removed from your bookmarks.`,
      });
    } else {
      addBookmark(user);
      toast({
        title: "Added to bookmarks",
        description: `${user.firstName} ${user.lastName} has been added to your bookmarks.`,
      });
    }
  };

  const handlePromote = () => {
    setPromoting(true);
    
    // Update the rating locally (capped at 5)
    const newRating = Math.min(currentRating + 1, 5);
    setCurrentRating(newRating);
    
    // If there's an onPromote prop, call it to update the parent state
    if (onPromote) {
      onPromote(user.id);
    }
    
    setTimeout(() => {
      setPromoting(false);
      toast({
        title: "Employee promoted",
        description: `${user.firstName} ${user.lastName} has been promoted. Their rating is now ${newRating}.`,
      });
    }, 1000);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-1.5">
              <h3 className="font-semibold text-lg leading-none">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{user.department}</span>
                <span className="text-sm text-muted-foreground">• Age: {user.age}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted/40 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Performance:</span>
              <Rating value={currentRating} size="sm" />
            </div>
            <PerformanceBadge rating={currentRating} size="sm" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2 p-2">
        <Link href={`/employee/${user.id}`} className="col-span-1">
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="mr-1 h-3.5 w-3.5" />
            View
          </Button>
        </Link>
        <Button 
          variant="outline" 
          size="sm" 
          className={`col-span-1 ${bookmarked ? 'bg-primary/10' : ''}`}
          onClick={handleBookmarkToggle}
        >
          <Bookmark 
            className={`mr-1 h-3.5 w-3.5 ${bookmarked ? 'fill-primary' : ''}`} 
          />
          {bookmarked ? 'Saved' : 'Save'}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="col-span-1"
          onClick={handlePromote}
          disabled={promoting || currentRating >= 5} // Disable if rating is already max
        >
          <ArrowUpCircle className={`mr-1 h-3.5 w-3.5 ${promoting ? 'animate-spin' : ''}`} />
          Promote
        </Button>
      </CardFooter>
    </Card>
  );
}
