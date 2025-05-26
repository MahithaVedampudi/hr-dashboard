import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/context/ThemeProvider";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HR Performance Dashboard",
  description: "Track employee performance, manage bookmarks, and view detailed insights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen")}>
        <ThemeProvider defaultTheme="system">
          <BookmarkProvider>
            <div className="flex min-h-screen">
              <Navbar />
              <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                {children}
              </main>
            </div>
            <Toaster />
          </BookmarkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}