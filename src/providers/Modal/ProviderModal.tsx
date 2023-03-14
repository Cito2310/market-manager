import { createContext, useReducer } from "react"

import { reducerMordal } from './reducerModal';
import { InterfaceContextModal } from './typesReducerModal';


export const ContextModal = createContext({} as InterfaceContextModal);

const initialState: InterfaceContextModal = {
    currentModal: "none",
    selectBarcode: "",
    dispatchModal: () => {}
}


interface props {  children: JSX.Element | JSX.Element[]  }

export const ProviderModal = ({children}: props) => {
    const [state, dispatch] = useReducer(reducerMordal, initialState)
    
    return (
        <ContextModal.Provider value={{
            currentModal: state.currentModal,
            selectBarcode: state.selectBarcode,
            dispatchModal: dispatch,
        }}>
            {children}
        </ContextModal.Provider>
    )
}