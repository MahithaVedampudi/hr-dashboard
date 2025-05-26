"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/types";
import { calculateAverageRating } from "@/lib/utils";
import { Users, Star, TrendingUp, Award } from "lucide-react";

interface StatsCardsProps {
  users: User[];
  bookmarkedCount: number;
}

export function StatsCards({ users, bookmarkedCount }: StatsCardsProps) {
  // Calculate average performance rating
  const ratings = users.map((user) => user.performanceRating || 0).filter(Boolean);
  const averageRating = calculateAverageRating(ratings);
  
  // Count high performers (rating >= 4)
  const highPerformers = users.filter((user) => (user.performanceRating || 0) >= 4).length;
  
  // Calculate percentage of high performers
  const highPerformerPercentage = users.length > 0 
    ? Math.round((highPerformers / users.length) * 100) 
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{users.length}</div>
          <p className="text-xs text-muted-foreground">
            Across {new Set(users.map(user => user.department)).size} departments
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">
            Out of 5.0 possible rating
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">High Performers</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{highPerformers}</div>
          <p className="text-xs text-muted-foreground">
            {highPerformerPercentage}% of total employees
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bookmarked</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{bookmarkedCount}</div>
          <p className="text-xs text-muted-foreground">
            {users.length > 0 
              ? Math.round((bookmarkedCount / users.length) * 100) 
              : 0}% of total employees
          </p>
        </CardContent>
      </Card>
    </div>
  );
}