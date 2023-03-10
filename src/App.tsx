import { ScreenCashRegister } from './screen_cash_register/ScreenCashRegister';

import "./config.scss"
import { InputText } from './input/InputText';
import { InputSelect } from './input/InputSelect';
import { InputNumber } from './input/InputNumber';

function App() {
  return (
    <div className="App">
      {/* <ScreenCashRegister/> */}
      <InputText
        label='Nombre'
        placeholder='Nombre'
      />

      <InputSelect
        label='select'
      />

      <InputNumber
        label='number'
        placeholder={225}
        defaultValue={20}
        length={{min: 0}}
      />
    </div>
  );
}

export default App;
