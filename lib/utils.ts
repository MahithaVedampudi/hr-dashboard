import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Departments for mockup data
export const departments: string[] = [
  "Engineering",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Product",
  "Design",
  "Customer Support"
];

// Generate random performance rating between 1 and 5
export function generatePerformanceRating(): number {
  return Math.floor(Math.random() * 5) + 1;
}

// Generate random department for users
export function assignDepartment(): string {
  const randomIndex = Math.floor(Math.random() * departments.length);
  return departments[randomIndex];
}

// Generate mock projects for employee
export function generateMockProjects(userId: number): any[] {
  const numberOfProjects = Math.floor(Math.random() * 4) + 1;
  const projects = [];
  
  for (let i = 0; i < numberOfProjects; i++) {
    const statusOptions = ["completed", "ongoing", "planned"];
    const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - Math.floor(Math.random() * 6));
    
    const endDate = randomStatus === "completed" 
      ? new Date(startDate.getTime() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000) 
      : randomStatus === "ongoing" ? undefined : null;

    projects.push({
      id: userId * 100 + i,
      name: `Project ${String.fromCharCode(65 + i)}`,
      status: randomStatus,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate ? endDate.toISOString().split('T')[0] : undefined,
      description: `This is a mock project description for user ${userId}.`
    });
  }
  
  return projects;
}

// Generate mock feedback for employee
export function generateMockFeedback(userId: number): any[] {
  const numberOfFeedbacks = Math.floor(Math.random() * 5) + 2;
  const feedbacks = [];
  
  const reviewers = [
    "Emma Johnson", "James Smith", "Michael Brown", "Sarah Davis", 
    "Daniel Wilson", "Olivia Martinez", "Robert Taylor", "Sophia Anderson"
  ];
  
  const feedbackComments = [
    "Consistently delivers high-quality work.",
    "Great team player and collaborator.",
    "Excellent problem-solving skills.",
    "Shows leadership potential.",
    "Needs improvement in communication.",
    "Outstanding performance this quarter.",
    "Met all project deadlines efficiently.",
    "Demonstrates strong technical knowledge.",
    "Adapts well to changing requirements."
  ];
  
  for (let i = 0; i < numberOfFeedbacks; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 12));
    
    feedbacks.push({
      id: userId * 100 + i,
      date: date.toISOString().split('T')[0],
      reviewer: reviewers[Math.floor(Math.random() * reviewers.length)],
      rating: Math.floor(Math.random() * 5) + 1,
      comment: feedbackComments[Math.floor(Math.random() * feedbackComments.length)]
    });
  }
  
  return feedbacks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Format date to a readable format
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Calculate average rating
export function calculateAverageRating(ratings: number[]): number {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((a, b) => a + b, 0);
  return parseFloat((sum / ratings.length).toFixed(1));
}

// Get a color based on rating
export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return "bg-green-500";
  if (rating >= 3.5) return "bg-green-400";
  if (rating >= 2.5) return "bg-yellow-400";
  if (rating >= 1.5) return "bg-orange-400";
  return "bg-red-500";
}

// Get text for performance level
export function getPerformanceLevel(rating: number): string {
  if (rating >= 4.5) return "Outstanding";
  if (rating >= 3.5) return "Exceeds Expectations";
  if (rating >= 2.5) return "Meets Expectations";
  if (rating >= 1.5) return "Needs Improvement";
  return "Unsatisfactory";
}