import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App';

import { ProviderDatabase, ProviderPrint, ProviderModal } from './providers/';
import { DevApp } from './DevApp';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  // <React.StrictMode>
  <HashRouter>

    <ProviderDatabase>
    <ProviderPrint>
    <ProviderModal>
      
      <App />
      {/* <DevApp/> */}

    </ProviderModal>
    </ProviderPrint>
    </ProviderDatabase>

  </HashRouter>

  // {/* </React.StrictMode> */}
);