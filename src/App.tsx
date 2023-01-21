import { useContext } from "react";

import { ContextBarcode } from './Provider/ProviderInputBarcode';
import { ScreenCashRegister } from "./screen_cash_register/ScreenCashRegister";

function App() {
  const { barcode, setBarcode } = useContext(ContextBarcode)

  return (
    <div className="App">
      <h1>{ barcode }</h1>
      <ScreenCashRegister></ScreenCashRegister>
    </div>
  )
}

export default App