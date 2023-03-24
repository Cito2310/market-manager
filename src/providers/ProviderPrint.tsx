import { createContext, useState } from 'react';
import { IProductWithAmount } from '../../Types/product';

interface IContextPrint {
    productToPrint: IProductWithAmount[],
    setProductToPrint: React.Dispatch<React.SetStateAction<IProductWithAmount[]>>,

    screenPrint: boolean,
    toggleScreenPrint: () => void,
}

export const ContextPrint = createContext({} as IContextPrint)

interface props {  children: JSX.Element | JSX.Element[]  }
export const ProviderPrint = ({ children }: props) => {
    const [screenPrint, setScreenPrint] = useState(false);
    const [productToPrint, setProductToPrint] = useState<IProductWithAmount[]>([]);

    const toggleScreenPrint = () => {setScreenPrint(!screenPrint)};

    // R E T U R N
    return (
        <ContextPrint.Provider  value={{
            screenPrint, toggleScreenPrint,
            productToPrint, setProductToPrint,
        }}>
            { children }
        </ContextPrint.Provider>
    )
}