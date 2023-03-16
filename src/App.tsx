import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ContextModal } from './providers/Modal/ProviderModal';
import { ContextDatabase } from './providers/Database/ProviderDatabase';

import { BottomBar, LoaderComponent, ModalCreateProduct, ModalDeleteProduct, ModalLoginProduct, ModalModifyProduct } from './components';

import { ScreenAllProducts } from './screen/ScreenAllProducts';
import { ScreenCashRegister } from './screen/ScreenCashRegister';

import "./config.scss"


function App() {
  const { currentModal } = useContext(ContextModal);
  const { setToken, token, statusDB } = useContext(ContextDatabase);

  return (
        <div className="App">
          {
            !token ? 
              <ModalLoginProduct setLoginToken={ setToken }/>
            :
              statusDB === "await" ? <LoaderComponent /> :
              
              <Routes>
                <Route path='/cash-register' element={ <ScreenCashRegister/> }/>
                <Route path='/all-products' element={ <ScreenAllProducts/> }/>

                <Route path='/*' element={ <Navigate to="/cash-register"/> }/>
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
