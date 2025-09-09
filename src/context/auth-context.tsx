
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MessageSquareWarning } from 'lucide-react';
import { getUnreadMessages, markMessageAsRead } from '@/lib/messages';

export type AccessLevel = 'full' | 'limited';

type AuthContextType = {
  isAuthenticated: boolean;
  isLocked: boolean;
  isReloading: boolean;
  login: (accessLevel: AccessLevel) => void;
  logout: () => void;
  unlockApp: (accessLevel: AccessLevel) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLocked, setIsLocked] = useState(true); // Default to locked
  const [isLoading, setIsLoading] = useState(true);
  const [isReloading, setIsReloading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const isDeviceVerified = localStorage.getItem('study-buddy-device-verified') === 'true';
      if (isDeviceVerified) {
        setIsAuthenticated(true); // Consider verified device as "authenticated" but locked
      }
    } catch (e) {
        console.error("Session/Local storage not available.");
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
        
        // --- Fetch messages on successful login ---
        if (accessLevel === 'full') {
            const isProduction = window.location.href.includes("study-buddy-two-phi.vercel.app");
            if (isProduction) {
                 getUnreadMessages().then(messages => {
                    messages.forEach(async (msg) => {
                        toast({
                            title: (
                                <div className="flex items-center gap-2">
                                    <MessageSquareWarning className="h-5 w-5 text-primary" />
                                    <span>New Message</span>
                                </div>
                            ),
                            description: msg.text,
                            duration: 10000,
                        });
                        await markMessageAsRead(msg.id);
                    });
                }).catch(error => {
                    console.error("Failed to check for messages on login:", error);
                });
            }
        }
        // --- End of message fetching logic ---

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
    <AuthContext.Provider value={{ isAuthenticated, isLocked, isReloading, login, logout, unlockApp }}>
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
