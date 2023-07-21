import { createSlice } from '@reduxjs/toolkit';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import {
  DEFAULT_SETTINGS,
  DEFAULT_SNIPPETS
} from '../../../constants/editorSettingsConstants';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    settings: DEFAULT_SETTINGS,
    snippets: DEFAULT_SNIPPETS,
    isChatGPTOpen: false,
    chatGPTQuestion: ''
  },
  reducers: {
    setSettings: (state, { payload }) => {
      state.settings = {
        ...state.settings,
        ...payload
      };
    },
    setSnippets: (state, { payload }) => {
      state.snippets = payload;
    },
    addNewSnippet: (state, { payload }) => {
      const { label, insertText, documentation } = payload;
      state.snippets.push({
        label,
        insertText,
        documentation,
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        kind: monaco.languages.CompletionItemKind.Snippet
      });
    },
    removeSnippet: (state, { payload }) => {
      const { label } = payload;
      const newSnippets = state.snippets.filter((el) => el.label !== label);
      state.snippets = newSnippets;
    },
    editSnippet: (state, { payload }) => {
      const { snippetToChangeLabel, ...configuration } = payload;

      const newSnippetArray = state.snippets.map((snippet) => {
        if (snippet.label === snippetToChangeLabel) {
          return {
            ...snippet.label,
            ...configuration
          };
        }
        return snippet;
      });
      state.snippets = newSnippetArray;
    },
    setChatGPTOpen: (state, { payload }) => {
      state.isChatGPTOpen = payload;
    },
    setChatGPTQuestion: (state, { payload }) => {
      state.chatGPTQuestion = payload;
    }
  }
});

export const {
  setSettings,
  setSnippets,
  addNewSnippet,
  removeSnippet,
  editSnippet,
  setChatGPTOpen,
  setChatGPTQuestion
} = settingsSlice.actions;
