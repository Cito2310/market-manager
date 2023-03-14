import { useContext, useLayoutEffect, useState } from 'react';
import axios from 'axios';

import { ScreenCashRegister } from './screen_cash_register/ScreenCashRegister';

import { ModalFormCreateProduct } from './modals/ModalFormCreateProduct';

import { ContextModal } from './providers/Modal/ProviderModal';

import "./config.scss"
import { ModalFormLoginProduct } from './modals/ModalFormLoginProduct';
import { ScreenAllProducts } from './screen/ScreenAllProducts';


function App() {
  const { currentModal, dispatchModal } = useContext(ContextModal);
  // const [loginToken, setLoginToken] = useState<string>("")
  const [loginToken, setLoginToken] = useState<string>("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGVhOTUxODNjZDdiZmY0YjUzNWE2ZCIsImlhdCI6MTY3ODgxNTE1MCwiZXhwIjoxNjc4ODI5NTUwfQ.3pQts0PDZg2IgmgbA9qI_ftpBbFVBDh44Hiuuc9m7FA")
  
  console.log(loginToken)
  return (
        <div className="App">
          {/* {
            !loginToken ? <ModalFormLoginProduct setLoginToken={ setLoginToken }/> : 

            <>
            {
              currentModal === "create" ? <ModalFormCreateProduct/>
              : null
            }
            <button onClick={()=>{dispatchModal({type: "Change modal-create-product"})}}>Modal create</button>
            
            
            
            
            </>
          } */}
          {/* <ModalFormLoginProduct setLoginToken={ setLoginToken }/> */}
          <ScreenAllProducts token={loginToken}/>
          {/* <ScreenCashRegister/> */}
        </div>
  );
}

export default App;
