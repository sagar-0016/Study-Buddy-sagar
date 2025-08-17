
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export type AccessLevel = 'full' | 'limited';

type AuthContextType = {
  isAuthenticated: boolean;
  isLocked: boolean;
  isReloading: boolean;
  login: (accessLevel: AccessLevel) => void;
  logout: () => void;
  lockApp: () => void;
  unlockApp: (accessLevel: AccessLevel) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isReloading, setIsReloading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const sessionActive = sessionStorage.getItem('study-buddy-session-active') === 'true';
      if (sessionActive) {
        setIsAuthenticated(true);
      }
    } catch (e) {
        console.error("Session storage not available.");
    } finally {
        setIsLoading(false);
    }
  }, []);

  const login = (accessLevel: AccessLevel) => {
    try {
        const currentAccessLevel = localStorage.getItem('study-buddy-access-level');
        const hasAccessChanged = currentAccessLevel && currentAccessLevel !== accessLevel;

        if (hasAccessChanged) {
            setIsReloading(true); // Set reloading state before reload
            localStorage.setItem('study-buddy-access-level', accessLevel);
            window.location.reload();
            return;
        }
        
        sessionStorage.setItem('study-buddy-session-active', 'true');
        localStorage.setItem('study-buddy-access-level', accessLevel);

    } catch (e) {
        console.error("Session/Local storage not available.");
    }
    setIsAuthenticated(true);
    setIsLocked(false);
  };

  const logout = () => {
    try {
        sessionStorage.removeItem('study-buddy-session-active');
        localStorage.removeItem('study-buddy-access-level');
        localStorage.removeItem('study-buddy-device-verified');
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out."
        })
    } catch (e) {
        console.error("Session/Local storage not available.");
    }
    setIsAuthenticated(false);
    setIsLocked(false);
     // Reload to ensure all states are cleared properly
    window.location.reload();
  };

  const lockApp = () => {
    if (isAuthenticated) {
        setIsLocked(true);
    }
  }

  const unlockApp = (accessLevel: AccessLevel) => {
    login(accessLevel);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLocked, isReloading, login, logout, lockApp, unlockApp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
