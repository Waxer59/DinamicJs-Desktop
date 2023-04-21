import { useDispatch, useSelector } from 'react-redux';
import {
  addCodeSaved,
  removeCodeSaved,
  renameCodeSaved,
  resetUploadedCode,
  setActiveCode,
  setCodeSaved,
  setUploadedCode
} from '../../store/slices/code/codeSlice';
import { useBase64 } from './useBase64';

export const useCodeStore = () => {
  const dispatch = useDispatch();
  const { encodeBase64, decodeBase64 } = useBase64();
  const { codeSaved, activeCode, uploadedCode } = useSelector(
    (state) => state.code
  );

  const onAddCodeSaved = (name, code = encodeBase64(activeCode)) => {
    dispatch(addCodeSaved({ name, code }));
  };

  const onRemoveCodeSaved = (name) => {
    dispatch(removeCodeSaved({ name }));
  };

  const onSetActiveCode = (text) => {
    dispatch(setActiveCode(text));
  };

  const onSetUploadedCode = (text) => {
    dispatch(setUploadedCode(text));
    dispatch(resetUploadedCode());
  };

  const onRenameCodeSaved = (oldName, newName) => {
    dispatch(renameCodeSaved({ oldName, newName }));
  };

  const onGetCodeSavedByName = (name) => {
    const code = codeSaved.find((code) => code.name === name);
    if (code) {
      return decodeBase64(code.code);
    }
    return '';
  };

  const onSetCodeSaved = (codeSaved) => {
    dispatch(setCodeSaved(codeSaved));
  };

  const onCheckNameAndCode = (name = '') => {
    const check = codeSaved.find((code) => code.name === name);
    return check;
  };

  return {
    onAddCodeSaved,
    onSetActiveCode,
    onSetUploadedCode,
    onRemoveCodeSaved,
    onCheckNameAndCode,
    onRenameCodeSaved,
    onGetCodeSavedByName,
    onSetCodeSaved,
    uploadedCode,
    activeCode,
    codeSaved
  };
};
