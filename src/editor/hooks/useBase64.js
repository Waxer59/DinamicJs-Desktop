import { encode, decode, isValid } from 'js-base64';

export const useBase64 = () => {
  const decodeBase64 = (code) => {
    const decodedText = isValid(code) ? decode(code) : '';
    return decodedText;
  };

  const encodeBase64 = (text) => {
    const encodedText = encode(text);
    return encodedText;
  };

  return {
    decodeBase64,
    encodeBase64
  };
};
