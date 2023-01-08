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
import { useRouteUrl } from './useRouteUrl';

export const useCodeStore = () => {
  const dispatch = useDispatch();
  const { encodeText, decodeByCode } = useRouteUrl();
  const { codeSaved, activeCode, uploadedCode } = useSelector(
    (state) => state.code
  );
  const onAddCodeSaved = (name, code = encodeText(activeCode)) => {
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
      return decodeByCode(code.code);
    }
    return '';
  };

  const onSetCodeSaved = (codeSaved) => {
    dispatch(setCodeSaved(codeSaved));
  };

  const onCheckNameAndCode = (name = '', code = '') => {
    const Check = codeSaved.find((code) => code.name === name);
    if (Check) {
      return Check.code === code;
    }
    return false;
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
