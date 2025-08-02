
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // This effect only checks for an active session.
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

  const login = () => {
    try {
        sessionStorage.setItem('study-buddy-session-active', 'true');
    } catch (e) {
        console.error("Session storage not available.");
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    try {
        // Clear session for immediate logout
        sessionStorage.removeItem('study-buddy-session-active');
        // Clear local storage to forget the device verification
        localStorage.removeItem('study-buddy-device-verified');
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out."
        })
    } catch (e) {
        console.error("Session/Local storage not available.");
    }
    setIsAuthenticated(false);
  };

  if (isLoading) {
    // Render nothing or a loading spinner while checking session state
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
