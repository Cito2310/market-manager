import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App';

import { ProviderDatabase } from './providers/Database/ProviderDatabase';
import { ProviderModal } from './providers/Modal/ProviderModal';
import { ProviderPrint } from './providers/Print/ProviderPrint';
import { TestStyle } from './TestStyle';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  // <React.StrictMode>
  <HashRouter>

    <ProviderDatabase>
    <ProviderPrint>
    <ProviderModal>
      
      <App />
      {/* <TestStyle/> */}

    </ProviderModal>
    </ProviderPrint>
    </ProviderDatabase>

  </HashRouter>

  // {/* </React.StrictMode> */}
);