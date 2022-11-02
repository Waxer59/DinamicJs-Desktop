import * as monaco from 'monaco-editor';
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import Swal from 'sweetalert2';
import Split from 'split.js';
import * as Babel from '@babel/standalone/babel';
import protect from 'loop-protect';

// //* Loop protection

Babel.registerPlugin('loopProtection', protect(100));

const transform = (source) =>
  Babel.transform(source, {
    plugins: ['loopProtection']
  }).code;

//* References
const downloadBtn = document.querySelector('#download-btn');

//* References

const code = document.querySelector('#code');
const output = document.querySelector('#output');

//* Functions

const download = (file, text) => {
  //! A file must contain text
  if (text === '') {
    throw new Error('A file can not be empty');
  }

  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8, ' + encodeURIComponent(text)
  );
  element.setAttribute('download', file);

  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

const update = () => {
  try {
    output.setAttribute('srcdoc', newHtml());
  } catch (error) {}
};

const newHtml = () => {
  let js = jsEditor.getValue() ?? '';

  // Protect infinite loops
  js = transform(js);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope&display=swap" rel="stylesheet">
    <style>
      ::-webkit-scrollbar {
      width: 10px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: #5c5c5c;
        border-radius: 5px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #6c6c6c;
      }
      *{
        font-family: 'Manrope', sans-serif;
        list-style: none;
        color: #cecece;
      }
      html{
        font-size: clamp(16px, 3vw, 28px); 
      }
      p{
        padding: 5px 0;
        font-size: 1rem;
        margin: 0;
      }
      .error{
          color: #ff3333;
      }
      </style>
      </head>
      <body>
      
      <div id="logger-container">
      <ul id="logger">
      
      </ul>
      </div>
      
      <script>
      const logger = document.querySelector('#logger');
      logger.innerHTML = '';
      try {
        console.stdlog = console.log.bind(console);
        consoleLogs = [];
        console.log = function(){
          consoleLogs.push(Array.from(arguments));
          // console.stdlog.apply(console, arguments);
        }
        ${js}
        if(consoleLogs){
          consoleLogs.forEach((log)=>{
            if(String(log).trim() == ''){
              return;
            }
            logger.innerHTML += '<li><p class="log"> Log: '+log+'</p></li>'
          })
        }
      } catch (error) {
        console.log(error, 'ERROR')
        logger.innerHTML = '<li><p class="error">' + error + '</p></li>'
      }
      </script>
      </body>
      </html>
      `;
};
//* Monaco editor
window.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'javascript') {
      return new JsWorker();
    }
  }
};

const jsEditor = monaco.editor.create(code, {
  value: '',
  language: 'javascript',
  theme: 'vs-dark',
  mouseWheelZoom: true,
  fontSize: 18,
  fontFamily: "'JetBrains Mono', Arial, Helvetica, sans-serif",
  fontLigatures: 'on',
  padding: {
    top: 16
    // left: 2
  },
  automaticLayout: true, // resize the code area
  minimap: {
    enabled: false
  },
  lineNumbers: false
});

jsEditor.onDidChangeModelContent(update);

//* SplitJS

Split(['#code-container', '#output-container']);

//* Initial funtions

output.setAttribute('srcdoc', newHtml());

//* SweetAlert2

const customClass = {
  popup: 'alerts',
  validationMessage: 'alerts'
};

downloadBtn.addEventListener('click', async () => {
  const { value } = await Swal.fire({
    title: 'Enter your file name',
    customClass,
    input: 'text',
    inputLabel: `Don't put the extension`,
    showCloseButton: true,
    showLoaderOnConfirm: true,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write something!';
      }
    }
  });

  if (value) {
    let text = jsEditor.getValue() ?? '';
    let filename = `${value}.js`;

    const Toast = Swal.mixin({
      toast: true,
      customClass,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    try {
      download(filename, text);

      Toast.fire({
        icon: 'success',
        title: 'File downloaded'
      });
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: error
      });
    }
  }
});
