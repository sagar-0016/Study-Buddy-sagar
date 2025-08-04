
"use client";

import { useState, useEffect, useRef } from 'react';

// Custom hook for localStorage
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const isMounted = useRef(false);

  const [storedValue, setStoredValue] = useState<T>(() => {
    // This function now only runs on the initial render, preventing re-reading from localStorage
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

  // Use a useEffect to write to localStorage only when storedValue changes.
  useEffect(() => {
    // We don't want to write the initial value to localStorage on first render
    if (isMounted.current) {
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        isMounted.current = true;
    }
  }, [key, storedValue]);


  const setValue = (value: T) => {
    // This function now just updates the state, triggering the useEffect
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
  };

  return [storedValue, setValue];
}
