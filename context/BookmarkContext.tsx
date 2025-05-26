"use client";

import { User } from "@/lib/types";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type BookmarkContextType = {
  bookmarks: User[];
  addBookmark: (user: User) => void;
  removeBookmark: (userId: number) => void;
  isBookmarked: (userId: number) => boolean;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<User[]>([]);

  // Load bookmarks from localStorage on initialization
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("hrDashboardBookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("hrDashboardBookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (user: User) => {
    if (!isBookmarked(user.id)) {
      setBookmarks((prev) => [...prev, user]);
    }
  };

  const removeBookmark = (userId: number) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== userId));
  };

  const isBookmarked = (userId: number) => {
    return bookmarks.some((bookmark) => bookmark.id === userId);
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}