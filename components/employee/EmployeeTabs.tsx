"use client";

import { useState } from "react";
import { User, Project, Feedback } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Rating } from "@/components/ui/rating";
import { formatDate, getRatingColor } from "@/lib/utils";
import { Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface EmployeeTabsProps {
  user: User;
  projects: Project[];
  feedback: Feedback[];
}

export function EmployeeTabs({ user, projects, feedback }: EmployeeTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getProjectStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "ongoing":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "planned":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getProjectStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "ongoing":
        return "Ongoing";
      case "planned":
        return "Planned";
      default:
        return status;
    }
  };

  return (
    <Tabs 
      defaultValue="overview" 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Experience Summary</CardTitle>
            <CardDescription>
              Performance and experience overview
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {["Communication", "Problem Solving", "Teamwork", "Leadership", "Technical Skills"]
                    .map(skill => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))
                  }
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Career Highlights</h4>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>Joined the company in {new Date().getFullYear() - Math.floor(Math.random() * 5 + 1)}</li>
                  <li>Worked on {projects.length} major projects</li>
                  <li>{Math.floor(Math.random() * 3 + 1)} performance awards</li>
                  <li>{user.performanceRating && user.performanceRating >= 4 ? "Consistently" : "Occasionally"} exceeds expectations</li>
                </ul>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Recent Activity</h4>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - i * 7);
                  return (
                    <div key={i} className="flex items-start gap-2">
                      <div className="bg-muted rounded-full p-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm">
                          {i === 0 ? 'Submitted quarterly report' : 
                           i === 1 ? 'Completed training program' : 
                           'Participated in team workshop'}
                        </p>
                        <p className="text-xs text-muted-foreground">{formatDate(date.toISOString())}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="projects" className="space-y-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Project History</CardTitle>
            <CardDescription>
              All projects {user.firstName} has been involved in
            </CardDescription>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">No projects found</p>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="flex items-start p-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{project.name}</h4>
                          <Badge 
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            {getProjectStatusIcon(project.status)}
                            {getProjectStatusText(project.status)}
                          </Badge>
                        </div>
                        <p className="text-sm mt-1">{project.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Start: {formatDate(project.startDate)}</span>
                          {project.endDate && <span>End: {formatDate(project.endDate)}</span>}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="feedback" className="space-y-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Feedback</CardTitle>
            <CardDescription>
              Feedback from managers and peers
            </CardDescription>
          </CardHeader>
          <CardContent>
            {feedback.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">No feedback available</p>
            ) : (
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-4 border rounded-lg transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{item.reviewer}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(item.date)}</p>
                      </div>
                      <Rating value={item.rating} size="sm" />
                    </div>
                    <p className="mt-2 text-sm">{item.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}