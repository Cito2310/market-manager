import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App';

import { ProviderDatabase } from './providers/Database/ProviderDatabase';
import { ProviderModal } from './providers/Modal/ProviderModal';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  // <React.StrictMode>
  <HashRouter>

    <ProviderDatabase>
    <ProviderModal>
      <App />
    </ProviderModal>
    </ProviderDatabase>

  </HashRouter>

  // {/* </React.StrictMode> */}
);