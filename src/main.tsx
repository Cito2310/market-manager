import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ProviderBarcode } from './Input_Barcode/ProviderInputBarcode'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <ProviderBarcode>
      <App />
    </ProviderBarcode>
  //{/* </React.StrictMode>, */}
)
