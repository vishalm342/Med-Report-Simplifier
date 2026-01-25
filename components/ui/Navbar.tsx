'use client';

import Link from 'next/link';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';
import { Activity, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Activity className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-semibold text-slate-900">
              CuraSense AI
            </h1>
          </Link>
          
          {/* Right: Navigation */}
          <div className="flex items-center gap-4">
            {!isLoaded ? (
              // Loading state
              <div className="w-24 h-10 bg-slate-100 rounded-lg animate-pulse"></div>
            ) : isSignedIn ? (
              // Signed in state
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                />
              </>
            ) : (
              // Signed out state
              <SignInButton mode="modal">
                <button
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                  aria-label="Sign in to CuraSense AI"
                >
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
