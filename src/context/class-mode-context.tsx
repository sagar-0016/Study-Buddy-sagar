
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ClassModeContextType = {
  isClassMode: boolean;
  toggleClassMode: () => void;
};

const ClassModeContext = createContext<ClassModeContextType | undefined>(undefined);

export const ClassModeProvider = ({ children }: { children: ReactNode }) => {
  const [isClassMode, setIsClassMode] = useState(false);

  const toggleClassMode = () => {
    setIsClassMode(prev => !prev);
  };

  return (
    <ClassModeContext.Provider value={{ isClassMode, toggleClassMode }}>
      {children}
    </ClassModeContext.Provider>
  );
};

export const useClassMode = () => {
  const context = useContext(ClassModeContext);
  if (context === undefined) {
    throw new Error('useClassMode must be used within a ClassModeProvider');
  }
  return context;
};
