/* eslint-disable no-template-curly-in-string */
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export const DEFAULT_SNIPPETS = [
  {
    label: 'clg',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'console.log(${1:})',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Log output to console'
  },
  {
    label: 'imp',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: "import ${1:module} from '${2:module}'",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Import module'
  },
  {
    label: 'afn',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: '() => {\n\t$0\n}',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Arrow function'
  },
  {
    label: 'afc',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'async function ${1:name}() {\n\t$0\n}',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Asynchronous function'
  },
  {
    label: 'fnc',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'function ${1:name}() {\n\t$0\n}',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Function'
  },
  {
    label: 'for',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText:
      'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t$0\n}',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'For loop'
  },
  {
    label: 'forin',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'for (const ${1:key} in ${2:object}) {\n\t$0\n}',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'For in loop'
  },
  {
    label: 'forof',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'for (const ${1:element} of ${2:iterable}) {\n\t$0\n}',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'For of loop'
  },
  {
    label: 'foreach',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: '${1:array}.forEach((${2:element}) => {\n\t$0\n})',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'For each loop'
  },
  {
    label: 'while',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'while (${1:condition}) {\n\t$0\n}',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'While loop'
  },
  {
    label: 'dowhile',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'do {\n\t$0\n} while (${1:condition});',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Do while loop'
  },
  {
    label: 'if',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'if (${1:condition}) {\n\t$0\n}',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'If statement'
  },
  {
    label: 'ifelse',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'if (${1:condition}) {\n\t$0\n} else {\n\t\n}',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'If else statement'
  },
  {
    label: 'ife',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText:
      'if (${1:condition}) {\n\t$0\n} else if (${2:condition}) {\n\t\n}',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'If else if statement'
  },
  {
    label: 'switch',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText:
      'switch (${1:expression}) {\n\tcase ${2:value}:\n\t\t$0\n\t\tbreak;\n\tdefault:\n\t\tbreak;\n}',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Switch statement'
  },
  {
    label: 'try',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: 'try {\n\t$0\n} catch (${1:error}) {\n\t\n}',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Try catch statement'
  },
  {
    label: 'map',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: '${1:array}.map((${2:element}) => {\n\t$0\n})',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Map'
  },
  {
    label: 'filter',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: '${1:array}.filter((${2:element}) => {\n\t$0\n})',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Filter'
  },
  {
    label: 'reduce',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText:
      '${1:array}.reduce((${2:accumulator}, ${3:currentValue}) => {\n\t$0\n})',
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Reduce'
  }
];

export const DEFAULT_SETTINGS = {
  theme: 'vs-dark',
  mouseWheelZoom: true,
  fontSize: 18,
  fontFamily: "'JetBrains Mono', Arial, Helvetica, sans-serif",
  fontLigatures: true,
  minimap: {
    enabled: false
  },
  lineNumbers: false,
  chatGPTApiKey: ''
};
