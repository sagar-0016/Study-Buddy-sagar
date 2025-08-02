
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
    try {
      // Check if the device has been verified in the past
      const deviceVerified = localStorage.getItem('study-buddy-device-verified') === 'true';
      // An active session is only for the current browser tab
      const sessionActive = sessionStorage.getItem('study-buddy-session-active') === 'true';

      // If the device is verified, we can consider the user authenticated for this session
      if (deviceVerified) {
        setIsAuthenticated(true);
        // Ensure session is marked as active if it's not already
        if (!sessionActive) {
            sessionStorage.setItem('study-buddy-session-active', 'true');
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
        console.error("Local/Session storage not available.");
    } finally {
        setIsLoading(false);
    }
  }, []);

  const login = () => {
    try {
        sessionStorage.setItem('study-buddy-session-active', 'true');
        // This is set in the login screen, but we ensure it's set on login.
        localStorage.setItem('study-buddy-device-verified', 'true');
    } catch (e) {
        console.error("Local/Session storage not available.");
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
