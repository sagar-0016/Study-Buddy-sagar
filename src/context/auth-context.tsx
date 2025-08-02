
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check session storage for an active session flag
    try {
      const sessionActive = sessionStorage.getItem('study-buddy-session-active') === 'true';
      setIsAuthenticated(sessionActive);
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
        sessionStorage.removeItem('study-buddy-session-active');
    } catch (e) {
        console.error("Session storage not available.");
    }
    setIsAuthenticated(false);
  };

  // While checking the session, you might want to render a loader or nothing
  if (isLoading) {
    return null; // Or a loading spinner component
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
