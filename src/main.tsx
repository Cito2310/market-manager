import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ProviderBarcode } from './Provider/ProviderInputBarcode'
import { ProviderProducts } from './Provider/ProviderProducts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ProviderProducts>
    <ProviderBarcode>
      <App />
    </ProviderBarcode>
  </ProviderProducts>
  //{/* </React.StrictMode>, */}
)
