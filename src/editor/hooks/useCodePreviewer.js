import { useTransformCode } from './useTransformCode';

const OVERRIDE_CONSOLE = `
Array.from(arguments).forEach((log)=>{
  if(typeof log === "symbol"){
    log = '<pre>'+log.toString()+'</pre>'
  }else if(typeof log === "function"){
    log = '<pre>'+log+'</pre>'
  }else if(typeof log === "string"){
    log = '<pre class="string">"'+ log +'"</pre>'
  }else if(typeof log === "number" || typeof log === "bigint"){
    log = '<pre class="number">'+ log +'</pre>'
  }else if(typeof log === "boolean"){
    log = '<pre class="'+log+'">'+ log +'</pre>'
  }else if(log === null || log === undefined){
    log = '<pre class="null">' + log + '</pre>';
  }else{
    let jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg,
    self = this;
    log = '<pre class="json-pre"><code>' +
    JSON.stringify(log, null, 3)
    .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;') +
    '</code></pre>';
  }
  document.querySelector('#logger').innerHTML += '<div class="log-el">'+log.replace(/[,]/g,",&nbsp&nbsp")+'</div>'
})`;

const STYLES = `
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
  color: #9F9F9F;
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
  .logger{
    padding-left:40px;
    margin: 16px 0;
  }
  .log-el{
    margin-bottom:10px;
  }
  pre{
    margin:0;
    display:inline;
  }
  .null{
    opacity:.7;
  }
  .true{
    color: #4BB543;
  }
  .false{
    color: #FC100D;
  }
`;
export const useCodePreviewer = () => {
  const { protectCode } = useTransformCode();

  const update = (output, code) => {
    try {
      output.setAttribute('srcdoc', newHtml(protectCode(code)));
    } catch (error) {}
  };

  const newHtml = (code) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Manrope&display=swap" rel="stylesheet">
          <style>
            ${STYLES}
          </style>
      </head>
      <body>
          <div id="logger-container">
            <div id="logger" class="logger">
            </div>
          </div>
          <script defer>
            window.onerror = function (e) {
              document.querySelector('#logger').innerHTML = '<div class="log-el"><p class="error">'+e+'</p></div>'
            };
          </script>
          <script type="module" defer>
            console.stdlog = console.log.bind(console);
            
            // Overriding console.* functions
            console.log = function(){
              ${OVERRIDE_CONSOLE}
            }

            console.error = function(){
              ${OVERRIDE_CONSOLE}
            }

            console.warn = function(){
              ${OVERRIDE_CONSOLE}
            }

            console.info = function(){
              ${OVERRIDE_CONSOLE}
            }

            console.table = function(){
              ${OVERRIDE_CONSOLE}
            }

            console.debug = function(){
              ${OVERRIDE_CONSOLE}
            }
            ${code.replace(/^(?!.*import).*$/gm, '')}
            try{
              ${code.replace(
                /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/gm,
                ''
              )}
            }catch(e){
              document.querySelector('#logger').innerHTML += '<div class="log-el"><p class="error">'+e+'</p></div>'
            }
          </script>
      </body>
    </html>
   `;
  };
  return {
    update
  };
};
