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
