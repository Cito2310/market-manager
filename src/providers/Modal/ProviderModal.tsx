import { createContext, useReducer } from "react"

import { reducerMordal } from './reducerModal';

import { InterfaceContextModal } from './typesReducerModal';
import { IProduct } from '../../../Types/product';


export const ContextModal = createContext({} as InterfaceContextModal);

const initialState: InterfaceContextModal = {
    currentModal: "none",
    productSelected: {} as IProduct,
    dispatchModal: () => {}
}


interface props {  children: JSX.Element | JSX.Element[]  }

export const ProviderModal = ({children}: props) => {
    const [state, dispatch] = useReducer(reducerMordal, initialState)
    
    return (
        <ContextModal.Provider value={{
            currentModal: state.currentModal,
            productSelected: state.productSelected,
            dispatchModal: dispatch,
        }}>
            {children}
        </ContextModal.Provider>
    )
}