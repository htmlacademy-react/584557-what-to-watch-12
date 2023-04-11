import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { promo } from './moks/promo';
import { store } from './store';
import { checkAuthAction } from './store/api-actions';

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App promo={promo} />
    </Provider>
  </React.StrictMode>
);
