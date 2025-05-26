"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/types";
import { departments } from "@/lib/utils";
import { useBookmarks } from "@/context/BookmarkContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface BookmarkStatsProps {
  users: User[];
}

export function BookmarkStats({ users }: BookmarkStatsProps) {
  const { bookmarks } = useBookmarks();
  const [view, setView] = useState("department");

  // Department stats
  const departmentStats = departments.map(dept => {
    const deptUsers = users.filter(u => u.department === dept);
    const deptBookmarks = bookmarks.filter(u => u.department === dept);
    const bookmarkRate = deptUsers.length > 0 
      ? (deptBookmarks.length / deptUsers.length) * 100 
      : 0;
      
    return {
      name: dept,
      bookmarkCount: deptBookmarks.length,
      bookmarkRate: parseFloat(bookmarkRate.toFixed(1)),
      totalEmployees: deptUsers.length,
      // For consistent color mapping
      index: departments.indexOf(dept)
    };
  }).filter(dept => dept.totalEmployees > 0);

  // Generate mock trend data (for demonstration purposes)
  const trendData = [
    { month: "Jan", bookmarks: 3 },
    { month: "Feb", bookmarks: 4 },
    { month: "Mar", bookmarks: 7 },
    { month: "Apr", bookmarks: 5 },
    { month: "May", bookmarks: 8 },
    { month: "Jun", bookmarks: 10 },
    { month: "Jul", bookmarks: 12 },
  ];

  // Get a color from chart CSS variables
  const getChartColor = (index: number) => {
    const colors = [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
    ];
    return colors[index % colors.length];
  };

  // Custom tooltip for the department chart
  const DepartmentTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-sm text-xs">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-muted-foreground">
            Bookmarked: {payload[0].payload.bookmarkCount} employees
          </p>
          <p className="text-muted-foreground">
            Rate: {payload[0].payload.bookmarkRate}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for the trend chart
  const TrendTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-sm text-xs">
          <p className="font-medium">{payload[0].payload.month}</p>
          <p className="text-muted-foreground">
            Bookmarks: {payload[0].payload.bookmarks}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookmark Analysis</CardTitle>
        <CardDescription>
          {view === "department" 
            ? "Bookmark distribution by department" 
            : "Bookmark trend over time"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={view} onValueChange={setView} className="h-[300px] mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="department">By Department</TabsTrigger>
            <TabsTrigger value="trend">Trend</TabsTrigger>
          </TabsList>
          <TabsContent value="department">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentStats}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.substring(0, 3)}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<DepartmentTooltip />} />
                <Bar dataKey="bookmarkCount">
                  {departmentStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getChartColor(entry.index)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="trend">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<TrendTooltip />} />
                <Line
                  type="monotone"
                  dataKey="bookmarks"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}