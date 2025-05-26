"use client";

import { useState, useEffect, useMemo } from "react";
import { User } from "@/lib/types";
import { assignDepartment, generatePerformanceRating } from "@/lib/utils";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://dummyjson.com/users?limit=20");
        
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        
        const data = await response.json();
        
        // Enhance users with department and performance rating
        const enhancedUsers = data.users.map((user: User) => ({
          ...user,
          department: assignDepartment(),
          performanceRating: generatePerformanceRating()
        }));
        
        setUsers(enhancedUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Search filter
      const searchMatch = searchTerm === "" || 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Department filter
      const departmentMatch = selectedDepartments.length === 0 || 
        (user.department && selectedDepartments.includes(user.department));
      
      // Rating filter
      const ratingMatch = selectedRatings.length === 0 || 
        (user.performanceRating !== undefined && selectedRatings.includes(user.performanceRating));
      
      return searchMatch && departmentMatch && ratingMatch;
    });
  }, [users, searchTerm, selectedDepartments, selectedRatings]);

  return {
    users,
    filteredUsers,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings
  };
}