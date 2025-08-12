
"use client";

import { useState, useEffect } from 'react';

// Custom hook for localStorage
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
          const item = window.localStorage.getItem(key);
          const currentValue = item ? JSON.parse(item) : initialValue;
          if (JSON.stringify(storedValue) !== JSON.stringify(currentValue)) {
              window.localStorage.setItem(key, JSON.stringify(storedValue));
          }
      }
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue, initialValue]);


  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
