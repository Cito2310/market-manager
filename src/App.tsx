import { useContext, useState } from 'react';

// import { ScreenCashRegister } from './screen_cash_register/ScreenCashRegister';

// import { ModalFormCreateProduct } from './modals/ModalFormCreateProduct';

import { ContextModal } from './providers/Modal/ProviderModal';

import "./config.scss"
import { ModalFormLoginProduct } from './modals/ModalFormLoginProduct';
import { ScreenAllProducts } from './screen/ScreenAllProducts';
// import { ModalModifyProduct } from './components/ModalModifyProduct';
import { BottomBar } from './components/BottomBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ContextProducts } from './providers/Products/ProviderProducts';


function App() {
  const { currentModal, dispatchModal } = useContext(ContextModal);
  const { setToken, token } = useContext(ContextProducts);

  return (
        <div className="App">
          {
            !token ? 
            <>
              <ModalFormLoginProduct setLoginToken={ setToken }/>
            </>
            :
            <>
              <Routes>
                {/* <Route path='/cash-register' element={ <ScreenCashRegister/> }/> */}
                <Route path='/all-products' element={ <ScreenAllProducts token={token}/> }/>

                <Route path='/*' element={ <Navigate to="/all-products"/> }/>
                {/* <Route path='/*' element={ <Navigate to="/cash-register"/> }/> */}
              </Routes>
            </>
          }
        
          {
            // currentModal === "create" ? <ModalFormCreateProduct token={token}/>
            // : currentModal === "modify" ? <ModalModifyProduct token={token}/>
            // currentModal === "create" ? <ModalFormCreateProduct/>
            // : null
          }

          <BottomBar/>
        </div>
  );
}

export default App;
