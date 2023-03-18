export const useLocalStorage = () => {
  const getLocalStorageItem = (key) => {
    try {
      const value = localStorage.getItem(key);
      const parsedValue = JSON.parse(value);
      return parsedValue;
    } catch (error) {
      return null;
    }
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
