import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { promo } from './moks/promo';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App promo={promo} />
  </React.StrictMode>
);
