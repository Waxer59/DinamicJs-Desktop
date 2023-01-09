import { encode, decode, isValid } from 'js-base64';

export const useRouteUrl = () => {
  const decodeByCode = (code) => {
    const decodedText = isValid(code) ? decode(code) : '';
    return decodedText;
  };

  const encodeText = (text) => {
    const encodedText = encode(text);
    return encodedText;
  };

  return {
    decodeByCode,
    encodeText
  };
};
