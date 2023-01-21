import { createContext, useState, useLayoutEffect } from 'react';
import { detectKeyUp } from '../helpers/detectKeyUp';

export const ContextBarcode = createContext({} as IBarcode);

export interface IBarcode {
    barcode: string,
    setBarcode: React.Dispatch<React.SetStateAction<string>>,
}

interface props {
    children: JSX.Element[] | JSX.Element
}


export const ProviderBarcode = ({ children }: props ) => {
    const [barcode, setBarcode] = useState<string>("");

    useLayoutEffect(() => {
        detectKeyUp(
            (event)=>{setBarcode(barcode + event!.key)},
            /^[0-9]+$/g
        )
    }, [barcode])

    return(
        <ContextBarcode.Provider value={{ barcode, setBarcode }}>
            { children }
        </ContextBarcode.Provider>
    )
}