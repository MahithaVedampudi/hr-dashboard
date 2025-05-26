/*"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User, Project, Feedback } from "@/lib/types";
import { EmployeeProfile } from "@/components/employee/EmployeeProfile";
import { EmployeeTabs } from "@/components/employee/EmployeeTabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  assignDepartment,
  generatePerformanceRating,
  generateMockProjects,
  generateMockFeedback,
} from "@/lib/utils";

export default function EmployeeDetailsPage() {
  const params = useParams();
  const employeeId = Number(params.id);

  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://dummyjson.com/users/${employeeId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        const userData = await response.json();

        // Enhance user data with department and performance rating
        const enhancedUser = {
          ...userData,
          department: assignDepartment(),
          performanceRating: generatePerformanceRating(),
        };

        setUser(enhancedUser);

        // Generate mock projects and feedback
        setProjects(generateMockProjects(employeeId));
        setFeedback(generateMockFeedback(employeeId));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (employeeId) {
      fetchEmployeeData();
    }
  }, [employeeId]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center">
          <Skeleton className="h-9 w-24 mr-4" />
          <Skeleton className="h-8 w-1/3" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-destructive mb-4">{error || "Employee not found"}</p>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Employee Details</h1>
      </div>

      <div className="space-y-8">
        <EmployeeProfile user={user} />
        <EmployeeTabs user={user} projects={projects} feedback={feedback} />
      </div>
    </div>
  );
}
  */

// app/employee/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User, Project, Feedback } from "@/lib/types";
import { EmployeeProfile } from "@/components/employee/EmployeeProfile";
import { EmployeeTabs } from "@/components/employee/EmployeeTabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  assignDepartment,
  generatePerformanceRating,
  generateMockProjects,
  generateMockFeedback,
} from "@/lib/utils";

// *** ADD generateStaticParams here ***
/*
export async function generateStaticParams() {
  try {
    const response = await fetch("https://dummyjson.com/users?limit=30");
    const data = await response.json();

    return data.users.map((user: { id: number }) => ({
      id: String(user.id),
    }));
  } catch (error) {
    return Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
    }));
  }
}

*/

export default function EmployeeDetailsPage() {
  const params = useParams();
  const employeeId = Number(params.id);

  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://dummyjson.com/users/${employeeId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        const userData = await response.json();

        const enhancedUser = {
          ...userData,
          department: assignDepartment(),
          performanceRating: generatePerformanceRating(),
        };

        setUser(enhancedUser);
        setProjects(generateMockProjects(employeeId));
        setFeedback(generateMockFeedback(employeeId));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (employeeId) {
      fetchEmployeeData();
    }
  }, [employeeId]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center">
          <Skeleton className="h-9 w-24 mr-4" />
          <Skeleton className="h-8 w-1/3" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-destructive mb-4">{error || "Employee not found"}</p>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Employee Details</h1>
      </div>

      <div className="space-y-8">
        <EmployeeProfile user={user} />
        <EmployeeTabs user={user} projects={projects} feedback={feedback} />
      </div>
    </div>
  );
}

