"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/lib/types";
import { departments, calculateAverageRating } from "@/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from "recharts";

interface DepartmentChartProps {
  users: User[];
}

export function DepartmentChart({ users }: DepartmentChartProps) {
  const [view, setView] = useState("bar");
  
  // Debug data
  console.log("Raw users data:", users);
  
  // Group by department and calculate average performance rating
  const departmentData = departments.map((department) => {
    const departmentUsers = users.filter((user) => user.department === department);
    const ratings = departmentUsers.map((user) => user.performanceRating || 0);
    const averageRating = calculateAverageRating(ratings);
    const employeeCount = departmentUsers.length;
    
    return {
      name: department,
      averageRating,
      employeeCount,
      index: departments.indexOf(department),
    };
  }).filter(dept => dept.employeeCount > 0);

  console.log("Processed department data:", departmentData);
  
  // Sort by average rating
  const sortedData = [...departmentData].sort((a, b) => b.averageRating - a.averageRating);

  const getChartColor = (index: number) => {
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];
    return colors[index % colors.length];
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-sm text-xs">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-muted-foreground">
            Average: {payload[0].payload.averageRating.toFixed(1)}
          </p>
          <p className="text-muted-foreground">
            Employees: {payload[0].payload.employeeCount}
          </p>
        </div>
      );
    }
    return null;
  };

  if (departmentData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>Average performance rating by department</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">
            No department data available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Performance</CardTitle>
        <CardDescription>Average performance rating by department</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <Tabs value={view} onValueChange={setView} className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="pie">Pie Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="bar" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.substring(0, 3)}
                />
                <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="averageRating">
                  {sortedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getChartColor(entry.index)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="pie" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="employeeCount"
                  nameKey="name"
                  label={({ name }) => name.substring(0, 3)}
                  labelLine={false}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getChartColor(entry.index)} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}