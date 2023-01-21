import { useContext } from "react";

import { ContextBarcode } from './Input_Barcode/ProviderInputBarcode';

function App() {
  const { barcode, setBarcode } = useContext(ContextBarcode)

  return (
    <div className="App">
      <h1>{ barcode }</h1>
    </div>
  )
}

export default App