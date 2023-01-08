import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSettings } from '../../store/slices/settings/settingsSlice';

export const useSettingsStore = () => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);

  useEffect(() => {
    document.querySelector('html').className =
      settings.theme === 'vs-dark' ? 'dark' : 'light';
  }, [settings.theme]);

  const onSetSettings = (settings) => {
    dispatch(setSettings(settings));
  };
  return {
    onSetSettings,
    settings
  };
};
