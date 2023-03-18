import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ContextModal } from './providers/Modal/ProviderModal';
import { ContextDatabase } from './providers/Database/ProviderDatabase';
import { ContextPrint } from './providers/Print/ProviderPrint';

import { BottomBar, LoaderComponent, ModalCreateProduct, ModalDeleteProduct, ModalLoginProduct, ModalModifyProduct, TicketPrint } from './components';

import { ScreenAllProducts } from './screen/ScreenAllProducts';
import { ScreenCashRegister } from './screen/ScreenCashRegister';

import "./config.scss"
import "./styles/btn-style.scss"


function App() {
  const { currentModal } = useContext(ContextModal);
  const { setToken, token, statusDB } = useContext(ContextDatabase);
  const { screenPrint } = useContext(ContextPrint);

  return (
        <div className="App">
          {
            screenPrint ? <TicketPrint/> : <>
            
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

            </>
          }
        </div>
  );
}

export default App;
