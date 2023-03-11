import { ScreenCashRegister } from './screen_cash_register/ScreenCashRegister';

import "./config.scss"
import { InputText } from './input/InputText';
import { InputSelect } from './input/InputSelect';
import { InputNumber } from './input/InputNumber';
import { ModalFormCreateProduct } from './modals/ModalFormCreateProduct';

function App() {
  return (
    <div className="App">
      {/* <ScreenCashRegister/> */}
      <ModalFormCreateProduct
        buttons={[
          {
            color: "primary",
            handler: () => {console.log("Hola")},
            label: "Hola"
          }
        ]}
        funcExit={()=>{console.log("exit")}}
        title="Crear Producto"
      />
    </div>
  );
}

export default App;
