import * as Babel from '@babel/standalone/babel';
import protect from 'loop-protect';
import autoConsoleLog from 'babel-plugin-auto-console-log';

const TIMEOUT = 100;

Babel.registerPlugin('loopProtection', protect(TIMEOUT));
Babel.registerPlugin('autoConsoleLog', autoConsoleLog());
export const useTransformCode = () => {
  const transform = (source) =>
    Babel.transform(source, {
      plugins: ['autoConsoleLog', 'loopProtection']
    }).code;

  const protectCode = (code) => {
    try {
      code = transform(code);
    } catch (error) {}
    return code;
  };

  return {
    protectCode
  };
};
