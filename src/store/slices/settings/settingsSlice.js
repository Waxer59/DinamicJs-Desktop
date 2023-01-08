import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    settings: {
      theme: 'vs-dark',
      mouseWheelZoom: true,
      fontSize: 18,
      fontFamily: "'JetBrains Mono', Arial, Helvetica, sans-serif",
      fontLigatures: true,
      minimap: {
        enabled: false
      },
      lineNumbers: false
    }
  },
  reducers: {
    setSettings: (state, { payload }) => {
      state.settings = {
        ...state.settings,
        ...payload
      };
    }
  }
});

export const { setSettings } = settingsSlice.actions;
