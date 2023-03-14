import { useContext, useState } from 'react';
import axios from 'axios';

import { ScreenCashRegister } from './screen_cash_register/ScreenCashRegister';

import { ModalFormCreateProduct } from './modals/ModalFormCreateProduct';

import { ContextModal } from './providers/Modal/ProviderModal';

import "./config.scss"
import { ModalFormLoginProduct } from './modals/ModalFormLoginProduct';


function App() {
  const { currentModal, dispatchModal } = useContext(ContextModal);
  const [loginToken, setLoginToken] = useState<string>("")
  
  return (
        <div className="App">
          {
            !loginToken ? <ModalFormLoginProduct setLoginToken={ setLoginToken }/> : 

            <>
            {
              currentModal === "create" ? <ModalFormCreateProduct/>
              : null
            }
            <button onClick={()=>{dispatchModal({type: "Change modal-create-product"})}}>Modal create</button>
            
            
            
            
            </>
          }
          {/* <ScreenCashRegister/> */}
        </div>
  );
}

export default App;
