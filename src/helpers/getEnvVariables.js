export const getEnvVariables = () => {
  return {
    VITE_ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT
  };
};
