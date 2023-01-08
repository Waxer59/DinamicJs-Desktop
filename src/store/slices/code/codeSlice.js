import { createSlice } from '@reduxjs/toolkit';

export const codeSlice = createSlice({
  name: 'code',
  initialState: {
    codeSaved: [], // when user saves a file localy, it will be stored here
    activeCode: null,
    uploadedCode: [] // when user uploads a file, it will be stored here and then reset
  },
  reducers: {
    addCodeSaved: (state, { payload }) => {
      if (!state.codeSaved.find((code) => code.name === payload.name)) {
        state.codeSaved.push(payload);
        return;
      }
      state.codeSaved = state.codeSaved.map((code) => {
        if (code.name === payload.name) {
          return payload;
        }
        return code;
      });
    },
    renameCodeSaved: (state, { payload }) => {
      state.codeSaved = state.codeSaved.map((code) => {
        if (code.name === payload.oldName) {
          return { name: payload.newName, code: code.code };
        }
        return code;
      });
    },
    setCodeSaved: (state, { payload }) => {
      state.codeSaved = payload;
    },
    removeCodeSaved: (state, { payload }) => {
      state.codeSaved = state.codeSaved.filter(
        (code) => code.name !== payload.name
      );
    },
    setActiveCode: (state, { payload }) => {
      state.activeCode = payload;
    },
    setUploadedCode: (state, { payload }) => {
      state.uploadedCode = payload;
    },
    resetUploadedCode: (state) => {
      state.uploadedCode = null;
    }
  }
});

export const {
  addCodeSaved,
  setActiveCode,
  setUploadedCode,
  resetUploadedCode,
  removeCodeSaved,
  renameCodeSaved,
  setCodeSaved
} = codeSlice.actions;
