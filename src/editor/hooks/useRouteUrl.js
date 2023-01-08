import { useNavigate } from 'react-router-dom';
import { encode, decode, isValid } from 'js-base64';

export const useRouteUrl = () => {
  const base64Param = document.location.pathname.replace('/', '');
  const navigate = useNavigate();

  const getBase64Param = () => {
    return base64Param;
  };

  const decodeText = () => {
    const decodedText = isValid(base64Param) ? decode(base64Param) : '';
    return decodedText;
  };

  const decodeByCode = (code) => {
    const decodedText = isValid(code) ? decode(code) : '';
    return decodedText;
  };

  const encodeText = (text) => {
    const encodedText = encode(text);
    return encodedText;
  };

  const saveCodeUrl = (text) => {
    const encodedText = encodeText(text);
    navigate(`/${encodedText}`);
  };
  return {
    decodeText,
    saveCodeUrl,
    decodeByCode,
    encodeText,
    getBase64Param
  };
};
