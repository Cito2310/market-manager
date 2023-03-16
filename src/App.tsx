import { useContext, useState } from 'react';

import { ContextModal } from './providers/Modal/ProviderModal';

import "./config.scss"
import { ModalFormLoginProduct } from './modals/ModalFormLoginProduct';
import { ScreenAllProducts } from './screen/ScreenAllProducts';
import { BottomBar } from './components/BottomBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoaderComponent } from './components/LoaderComponent';
import { ContextDatabase } from './providers/Database/ProviderDatabase';
import { ModalCreateProduct } from './components/ModalCreateProduct';
import { ModalModifyProduct } from './components/ModalModifyProduct';
import { ModalDeleteProduct } from './components/ModalDeleteProduct';


function App() {
  const { currentModal, dispatchModal } = useContext(ContextModal);
  const { setToken, token, statusDB } = useContext(ContextDatabase);

  return (
        <div className="App">
          {
            !token ? 
              <ModalFormLoginProduct setLoginToken={ setToken }/>
            :
              statusDB === "await" ? <LoaderComponent /> :
              
              <Routes>
                {/* <Route path='/cash-register' element={ <ScreenCashRegister/> }/> */}
                <Route path='/all-products' element={ <ScreenAllProducts/> }/>

                <Route path='/*' element={ <Navigate to="/all-products"/> }/>
                {/* <Route path='/*' element={ <Navigate to="/cash-register"/> }/> */}
              </Routes>
          }
        
          {
            currentModal === "create" ? <ModalCreateProduct/>
            : currentModal === "modify" ? <ModalModifyProduct/>
            : currentModal === "delete" ? <ModalDeleteProduct/>
            : null
          }

          <BottomBar/>
        </div>
  );
}

export default App;
