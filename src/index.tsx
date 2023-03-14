import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ProviderModal } from './providers/Modal/ProviderModal';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  // <React.StrictMode>
  <ProviderModal>
    <App />

  </ProviderModal>

  // {/* </React.StrictMode> */}
);