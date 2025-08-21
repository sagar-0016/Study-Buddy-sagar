
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type BackgroundContextType = {
  backgroundImage: string | null;
  setBackgroundImage: (imageDataUrl: string) => void;
  clearBackgroundImage: () => void;
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundImage, setBackgroundImageState] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedBg = localStorage.getItem('custom-background-image');
      if (storedBg) {
        setBackgroundImageState(storedBg);
      }
    } catch (e) {
      console.error("Local storage not available.");
    } finally {
        setIsLoaded(true);
    }
  }, []);

  const setBackgroundImage = (imageDataUrl: string) => {
    try {
      localStorage.setItem('custom-background-image', imageDataUrl);
      setBackgroundImageState(imageDataUrl);
    } catch (e) {
      console.error("Local storage not available.");
    }
  };

  const clearBackgroundImage = () => {
    try {
      localStorage.removeItem('custom-background-image');
      setBackgroundImageState(null);
    } catch (e) {
      console.error("Local storage not available.");
    }
  };

  // Don't render children until the background has been loaded from localStorage to prevent flicker
  if (!isLoaded) {
    return null;
  }

  return (
    <BackgroundContext.Provider value={{ backgroundImage, setBackgroundImage, clearBackgroundImage }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};
