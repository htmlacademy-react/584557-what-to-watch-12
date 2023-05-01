import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import browserHistory from './browser-history';
import App from './components/app/app';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import HistoryRouter from './hocs/history-route/history-route';
import { store } from './store';
import { checkAuthAction } from './store/api-actions';

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
