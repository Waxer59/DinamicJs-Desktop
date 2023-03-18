import { configureStore } from '@reduxjs/toolkit';
import { getEnvVariables } from '../helpers/getEnvVariables';
import { codeSlice } from './slices/code/codeSlice';
import { settingsSlice } from './slices/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    code: codeSlice.reducer,
    settings: settingsSlice.reducer
  },
  devTools: getEnvVariables().VITE_ENVIRONMENT === 'DEV'
});
