import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Activity, BookOpen, LogIn } from "lucide-react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CuraSense AI - Medical Report Simplifier",
  description: "AI-powered medical report analysis for patient education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans bg-slate-50 text-slate-900 antialiased`}
      >
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left: Logo */}
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-semibold text-slate-900">
                  CuraSense AI
                </h1>
              </div>
              
              {/* Right: Navigation Links */}
              <div className="flex items-center gap-4">
                <a 
                  href="#documentation" 
                  className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
                >
                  <BookOpen className="w-4 h-4" />
                  Documentation
                </a>
                <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              </div>
            </div>
          </nav>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
