"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/types";
import { getPerformanceLevel } from "@/lib/utils";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface PerformanceDistributionProps {
  users: User[];
}

export function PerformanceDistribution({ users }: PerformanceDistributionProps) {
  // Count users by performance level
  const performanceCounts = users.reduce((acc: Record<string, number>, user) => {
    const rating = user.performanceRating || 0;
    const level = getPerformanceLevel(rating);
    
    if (!acc[level]) {
      acc[level] = 0;
    }
    
    acc[level]++;
    return acc;
  }, {});

  // Convert to array for the chart
  const performanceData = Object.entries(performanceCounts).map(([name, value], index) => ({
    name,
    value,
    index,
  }));

  // Get color for each performance level
  const getPerformanceColor = (level: string) => {
    switch (level) {
      case "Outstanding":
        return "var(--chart-1)";
      case "Exceeds Expectations":
        return "var(--chart-2)";
      case "Meets Expectations":
        return "var(--chart-3)";
      case "Needs Improvement":
        return "var(--chart-4)";
      case "Unsatisfactory":
        return "var(--chart-5)";
      default:
        return "var(--chart-1)";
    }
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-sm text-xs">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-muted-foreground">
            Count: {payload[0].value} ({((payload[0].value / users.length) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Distribution</CardTitle>
        <CardDescription>
          Employee count by performance rating level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {performanceData.map((entry) => (
                  <Cell 
                    key={`cell-${entry.name}`} 
                    fill={getPerformanceColor(entry.name)} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}