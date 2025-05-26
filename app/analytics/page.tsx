"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DepartmentChart } from "@/components/dashboard/DepartmentChart";
import { PerformanceDistribution } from "@/components/dashboard/PerformanceDistribution";
import { BookmarkStats } from "@/components/dashboard/BookmarkStats";
import { useUsers } from "@/hooks/useUsers";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChartBig,
  PieChart,
  TrendingUp
} from "lucide-react";

export default function AnalyticsPage() {
  const { users } = useUsers();
  const [view, setView] = useState("performance");

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <BarChartBig className="mr-2 h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      </div>

      <Tabs value={view} onValueChange={setView} className="space-y-4">
        <TabsList className="w-full md:w-auto grid grid-cols-3">
          <TabsTrigger value="performance" className="flex items-center gap-1">
            <BarChartBig className="h-4 w-4" />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center gap-1">
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline">Distribution</span>
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Bookmarks</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>
                  Overview of employee performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  The performance metrics are calculated based on project completion rates, 
                  peer reviews, and manager evaluations. The data is updated quarterly.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Total Employees</p>
                    <p className="text-2xl font-bold">{users.length}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Departments</p>
                    <p className="text-2xl font-bold">
                      {new Set(users.map(user => user.department)).size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <DepartmentChart users={users} />
          </div>
        </TabsContent>
        
        <TabsContent value="distribution" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PerformanceDistribution users={users} />
            <Card>
              <CardHeader>
                <CardTitle>Rating Interpretation</CardTitle>
                <CardDescription>
                  Understanding performance rating levels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="bg-chart-1 w-3 h-3 rounded-full"></div>
                    <p className="text-sm font-medium">Outstanding (4.5-5.0)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-chart-2 w-3 h-3 rounded-full"></div>
                    <p className="text-sm font-medium">Exceeds Expectations (3.5-4.4)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-chart-3 w-3 h-3 rounded-full"></div>
                    <p className="text-sm font-medium">Meets Expectations (2.5-3.4)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-chart-4 w-3 h-3 rounded-full"></div>
                    <p className="text-sm font-medium">Needs Improvement (1.5-2.4)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-chart-5 w-3 h-3 rounded-full"></div>
                    <p className="text-sm font-medium">Unsatisfactory (0-1.4)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="bookmarks" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BookmarkStats users={users} />
            <Card>
              <CardHeader>
                <CardTitle>Bookmark Usage</CardTitle>
                <CardDescription>
                  How to use the bookmark feature
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Bookmarks allow HR managers to save important employee profiles for quick access. 
                  Use bookmarks to:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Track high-potential employees</li>
                  <li>Monitor employees who need improvement</li>
                  <li>Create shortlists for promotions or projects</li>
                  <li>Quickly access frequently viewed profiles</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Bookmark trends are analyzed to identify patterns in talent management across departments.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}