"use client";

import { User } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { PerformanceBadge } from "@/components/ui/performance-badge";
import { useBookmarks } from "@/context/BookmarkContext";
import { Bookmark, Mail, Phone, MapPin, ArrowUpCircle, Building } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

interface EmployeeProfileProps {
  user: User;
}

export function EmployeeProfile({ user }: EmployeeProfileProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const bookmarked = isBookmarked(user.id);
  const { toast } = useToast();

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
    toast({
      title: "Employee promoted",
      description: `${user.firstName} ${user.lastName} has been promoted.`,
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-36 bg-gradient-to-r from-blue-500/30 to-teal-500/30">
          <div className="absolute -bottom-16 left-6">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-background">
              <Image
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-20 px-6 pb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-muted-foreground">{user.department}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmarkToggle}
                className={bookmarked ? "bg-primary/10" : ""}
              >
                <Bookmark
                  className={`mr-1 h-4 w-4 ${bookmarked ? "fill-primary" : ""}`}
                />
                {bookmarked ? "Saved" : "Save"}
              </Button>
              <Button variant="default" size="sm" onClick={handlePromote}>
                <ArrowUpCircle className="mr-1 h-4 w-4" />
                Promote
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  {user.address.address}, {user.address.city}, {user.address.state} {user.address.postalCode}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{user.department}</span>
              </div>
            </div>
            
            <div className="bg-muted/40 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Performance Rating</h3>
              <div className="flex items-center gap-2 mb-2">
                <Rating value={user.performanceRating || 0} size="lg" />
                <span className="text-lg font-semibold">
                  {user.performanceRating?.toFixed(1)}
                </span>
              </div>
              <PerformanceBadge rating={user.performanceRating || 0} size="lg" />
              <p className="mt-3 text-sm text-muted-foreground">
                Performance rating based on project completion rate, peer feedback, and manager evaluation.
              </p>
            </div>
          </div>
          
          <div className="bg-muted/40 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">About {user.firstName}</h3>
            <p className="text-sm text-muted-foreground">
              {user.firstName} {user.lastName} is a dedicated professional with {user.age > 30 ? "over 5" : "2-3"} years of experience in the {user.department} department. 
              {user.performanceRating && user.performanceRating >= 4 
                ? ` They consistently exceeds expectations and demonstrates strong leadership potential.`
                : user.performanceRating && user.performanceRating >= 3
                ? ` They regularly meets expectations and shows good collaboration skills.`
                : ` They are working on improving their performance and skill set.`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}