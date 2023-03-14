import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App';

import { ProviderModal } from './providers/Modal/ProviderModal';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  // <React.StrictMode>
  <HashRouter>

    <ProviderModal>
      <App />
    </ProviderModal>

  </HashRouter>

  // {/* </React.StrictMode> */}
);