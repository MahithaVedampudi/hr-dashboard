"use client";

import { useUsers } from "@/hooks/useUsers";
import { useBookmarks } from "@/context/BookmarkContext";
import { StatsCards } from "./StatsCards";
import { DepartmentChart } from "./DepartmentChart";
import { PerformanceDistribution } from "./PerformanceDistribution";
import { BookmarkStats } from "./BookmarkStats";

export function StatsClientWrapper() {
  const { users } = useUsers();
  const { bookmarks } = useBookmarks();
  
  return <StatsCards users={users} bookmarkedCount={bookmarks.length} />;
}

export function DepartmentChartClientWrapper() {
  const { users } = useUsers();
  return <DepartmentChart users={users} />;
}

export function PerformanceDistributionClientWrapper() {
  const { users } = useUsers();
  return <PerformanceDistribution users={users} />;
}

export function BookmarkStatsClientWrapper() {
  const { users } = useUsers();
  return <BookmarkStats users={users} />;
}