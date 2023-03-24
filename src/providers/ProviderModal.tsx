import { createContext, useReducer, useState } from 'react';

import { IProductFormat } from '../../Types/product';

interface IContextModals {
    currentModal: ICurrentModal
    setCurrentModal: React.Dispatch<React.SetStateAction<ICurrentModal>>
    exitModal: () => void

    productSelected: IProductFormat | undefined
    setProductSelected: React.Dispatch<React.SetStateAction<IProductFormat | undefined>>
}
type ICurrentModal = "none" | "create-product" | "create-category" | "not-found" | "delete-product" | "modify-product"; 

export const ContextModal = createContext({} as IContextModals);

interface props {  children: JSX.Element | JSX.Element[]  }

export const ProviderModal = ({children}: props) => {
    const [currentModal, setCurrentModal] = useState<ICurrentModal>("none");
    const [productSelected, setProductSelected] = useState<IProductFormat | undefined>(undefined);
    const exitModal = () => { setCurrentModal("none") };
    
    return (
        <ContextModal.Provider value={{
            currentModal, setCurrentModal, exitModal,
            productSelected, setProductSelected
        }}>
            {children}
        </ContextModal.Provider>
    )
}