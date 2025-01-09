import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from "react-redux";

import { AppMarketManager } from './AppMarketManager';
import { store } from './store/store';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    // <React.StrictMode>
        <HashRouter>
            <Provider store={ store }>
                <AppMarketManager />
            </Provider>
        </HashRouter>
    // </React.StrictMode>
);