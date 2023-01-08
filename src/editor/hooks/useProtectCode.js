import * as Babel from '@babel/standalone/babel';
import protect from 'loop-protect';

const TIMEOUT = 100;

Babel.registerPlugin('loopProtection', protect(TIMEOUT));
export const useProtectCode = () => {
  const transform = (source) =>
    Babel.transform(source, {
      plugins: ['loopProtection']
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
