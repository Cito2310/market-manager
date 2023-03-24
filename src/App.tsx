import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ContextModal, ContextDatabase, ContextPrint } from './providers';

import { BottomBar, LoaderComponent, TicketPrint } from './components';
import { ModalCreateCategory, ModalCreateProduct, ModalDeleteProduct, ModalModifyProduct, ModalNotFoundProduct } from "./components/modals";
import { PrivateRoute } from './routes/PrivateRoute';

import { ScreenAllProducts } from './screen/ScreenAllProducts';
import { ScreenCashRegister } from './screen/ScreenCashRegister';
import { ScreenCategories } from './screen/ScreenCategories';

import "./config.scss"
import "./styles/btn.scss"
import "./styles/modal.scss"


function App() {
  const { currentModal } = useContext(ContextModal);
  const { statusDB } = useContext(ContextDatabase);
  const { screenPrint } = useContext(ContextPrint);

  return (
        <div className="App">
          {
            screenPrint ? <TicketPrint/> : <>
            
              {
                  statusDB === "await" ? <LoaderComponent /> :
                  
                  <Routes>
                    <Route path='/cash-register' element={ <ScreenCashRegister/> }/>

                    <Route path='/all-products' element={ 
                      <PrivateRoute>
                        <ScreenAllProducts/>
                      </PrivateRoute> 
                    }/>

                    <Route path='/categories' element={ 
                      <PrivateRoute>
                        <ScreenCategories/>
                      </PrivateRoute> 
                    }/>
    
                    <Route path='/*' element={ <Navigate to="/cash-register"/> }/>
                  </Routes>
              }
            
              {
                currentModal === "create-product" ? <ModalCreateProduct/>
                : currentModal === "modify-product" ? <ModalModifyProduct/>
                : currentModal === "delete-product" ? <ModalDeleteProduct/>
                : currentModal === "create-category" ? <ModalCreateCategory/>
                : currentModal === "not-found" ? <ModalNotFoundProduct/>
                : null
              }
    
              <BottomBar/>

            </>
          }
        </div>
  );
}

export default App;
