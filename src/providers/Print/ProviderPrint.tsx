import { createContext, useState } from 'react';
import { IProductWithAmount } from '../../../Types/product';

interface IContextPrint {
    productToPrint: IProductWithAmount[],
    screenPrint: boolean,
    setProductToPrint: React.Dispatch<React.SetStateAction<IProductWithAmount[]>>,
    setScreenPrint: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContextPrint = createContext({} as IContextPrint)

interface props {  children: JSX.Element | JSX.Element[]  }
export const ProviderPrint = ({ children }: props) => {
    const [screenPrint, setScreenPrint] = useState(false);
    const [productToPrint, setProductToPrint] = useState<IProductWithAmount[]>([]);

    // R E T U R N
    return (
        <ContextPrint.Provider  value={{
            screenPrint, setScreenPrint,
            productToPrint, setProductToPrint,
        }}>
            { children }
        </ContextPrint.Provider>
    )
}