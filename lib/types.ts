export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  department?: string;
  performanceRating?: number;
}

export interface Department {
  id: string;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  status: "completed" | "ongoing" | "planned";
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Feedback {
  id: number;
  date: string;
  reviewer: string;
  rating: number;
  comment: string;
}