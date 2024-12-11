// Custom hook for local storage
import { useState, useEffect } from 'react';
import { storageService } from '../services/storage';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    return storageService.get(key) ?? initialValue;
  });

  useEffect(() => {
    storageService.set(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};