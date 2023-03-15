import { useContext, useState } from 'react';

// // import { ScreenCashRegister } from './screen_cash_register/ScreenCashRegister';

// // import { ModalFormCreateProduct } from './modals/ModalFormCreateProduct';

// import { ContextModal } from './providers/Modal/ProviderModal';

import "./config.scss"
import { ModalFormLoginProduct } from './modals/ModalFormLoginProduct';
import { ScreenAllProducts } from './screen/ScreenAllProducts';
// // import { ModalModifyProduct } from './components/ModalModifyProduct';
import { BottomBar } from './components/BottomBar';
import { Navigate, Route, Routes } from 'react-router-dom';
// import { ContextProducts } from './providers/Database/ProviderProducts';
import { LoaderComponent } from './components/LoaderComponent';
import { ContextDatabase } from './providers/Database/ProviderDatabase';


function App() {
  // const { currentModal, dispatchModal } = useContext(ContextModal);
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
