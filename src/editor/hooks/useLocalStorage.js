export const useLocalStorage = () => {
  const getLocalStorageItem = (key) => {
    const value = localStorage.getItem(key);
    if (value === 'undefined') return null;
    return value ? JSON.parse(value) : null;
  };
  const setLocalStorageItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const removeLocalStorageItem = (key) => {
    localStorage.removeItem(key);
  };
  const clearLocalStorage = () => {
    localStorage.clear();
  };
  return {
    getLocalStorageItem,
    setLocalStorageItem,
    removeLocalStorageItem,
    clearLocalStorage
  };
};
