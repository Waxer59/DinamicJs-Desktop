import { useCallback } from 'react';

export const useLocalStorage = () => {
  const getLocalStorageItem = useCallback((key) => {
    try {
      const value = localStorage.getItem(key);
      const parsedValue = JSON.parse(value);
      return parsedValue;
    } catch (error) {
      return null;
    }
  }, []);
  const setLocalStorageItem = useCallback((key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);
  const removeLocalStorageItem = useCallback((key) => {
    localStorage.removeItem(key);
  }, []);
  const clearLocalStorage = useCallback(() => {
    localStorage.clear();
  }, []);
  return {
    getLocalStorageItem,
    setLocalStorageItem,
    removeLocalStorageItem,
    clearLocalStorage
  };
};
