import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ContextModal } from './providers/Modal/ProviderModal';
import { ContextDatabase } from './providers/Database/ProviderDatabase';
import { ContextPrint } from './providers/Print/ProviderPrint';

import { BottomBar, LoaderComponent, ModalCreateProduct, ModalDeleteProduct, ModalModifyProduct, TicketPrint } from './components';
import { PrivateRoute } from './routes/PrivateRoute';

import { ScreenAllProducts } from './screen/ScreenAllProducts';
import { ScreenCashRegister } from './screen/ScreenCashRegister';
import { ScreenCategories } from './screen/ScreenCategories';

import "./config.scss"
import "./styles/btn-style.scss"


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
