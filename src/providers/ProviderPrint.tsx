import { createContext, useState } from 'react';
import { IProductWithAmount } from '../../Types/product';

interface IContextPrint {
    productToPrint: IProductWithAmount[],
    setProductToPrint: React.Dispatch<React.SetStateAction<IProductWithAmount[]>>,

    screenPrint: boolean,
    offScreenPrint: () => void,
    onScreenPrint: () => void,
}

export const ContextPrint = createContext({} as IContextPrint)

interface props {  children: JSX.Element | JSX.Element[]  }
export const ProviderPrint = ({ children }: props) => {
    const [screenPrint, setScreenPrint] = useState(false);
    const [productToPrint, setProductToPrint] = useState<IProductWithAmount[]>([]);

    const offScreenPrint = () => { setScreenPrint(false) };
    const onScreenPrint = () => { setScreenPrint(true) };

    // R E T U R N
    return (
        <ContextPrint.Provider  value={{
            screenPrint, offScreenPrint, onScreenPrint,
            productToPrint, setProductToPrint,
        }}>
            { children }
        </ContextPrint.Provider>
    )
}