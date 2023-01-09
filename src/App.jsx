import { store } from './store/store';
import { Provider } from 'react-redux';
import { EditorPage } from './editor/pages/EditorPage';

export const App = () => {
  return (
    <Provider store={store}>
      <EditorPage />
    </Provider>
  );
};
