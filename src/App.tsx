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
  const [loginToken, setLoginToken] = useState<string>("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGVhOTUxODNjZDdiZmY0YjUzNWE2ZCIsImlhdCI6MTY3ODc2NzE1NiwiZXhwIjoxNjc4NzgxNTU2fQ.3TP2LuP8qcoEV3412nTyTcYvDBpCgzGkkTJolSjOU8A")
  
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
