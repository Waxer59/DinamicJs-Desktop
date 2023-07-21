import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

let snippets = [];

monaco.languages.registerCompletionItemProvider('javascript', {
  provideCompletionItems: () => {
    const suggestions = snippets.map((item) => ({ ...item }));
    return { suggestions };
  }
});

export const setEditorSnippets = (newSnippets = []) => {
  snippets = newSnippets;
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ESNext,
    allowNonTsExtensions: true
  });
};

export const setChatGPTFeatures = (editor, run) => {
  editor.addAction({
    // An unique identifier of the contributed action.
    id: 'ask-chatgpt',

    // A label of the action that will be presented to the user.
    label: 'Ask ChatGPT',

    // An optional array of keybindings for the action.
    keybindings: [
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10,
      // chord
      monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK)
    ],

    // A precondition for this action.
    precondition: null,

    // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
    keybindingContext: null,

    contextMenuGroupId: 'navigation',

    contextMenuOrder: 1,
    run
  });
};
