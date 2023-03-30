import { createContext, useState, useEffect } from 'react';
import { IProductFormat } from '../../Types/product';

// TYPESCRIPT
interface IContextModals {
    currentModal: ICurrentModal
    setCurrentModal: React.Dispatch<React.SetStateAction<ICurrentModal>>
    exitModal: () => void

    productSelected: IProductFormat | undefined
    setProductSelected: React.Dispatch<React.SetStateAction<IProductFormat | undefined>>
}
type ICurrentModal = "none" | "create-product" | "create-category" | "not-found" | "delete-product" | "modify-product"; 
export const ContextModal = createContext({} as IContextModals);





// PROVIDER COMPONENT
interface props {  children: JSX.Element | JSX.Element[]  }
export const ProviderModal = ({children}: props) => {
    const [currentModal, setCurrentModal] = useState<ICurrentModal>("none"); // state current modal
    const [productSelected, setProductSelected] = useState<IProductFormat | undefined>(undefined); // state product selected
    const exitModal = () => setCurrentModal("none"); // func exit modal

    // FUNCTION DELETE OVERFLOW-Y ACTIVE MODAL
    useEffect(() => {
        currentModal === "none" ? document.body.style.overflowY = "auto" : document.body.style.overflowY = "hidden"
    }, [currentModal])
    
    // RETURN
    return (
        <ContextModal.Provider value={{
            currentModal, setCurrentModal, exitModal,
            productSelected, setProductSelected
        }}>
            {children}
        </ContextModal.Provider>
    )
}