import { createContext, useState, useLayoutEffect } from 'react';
import { IProduct } from '../interfaces/IProduct';

export const ContextProducts = createContext({} as IProducts);

export interface IProducts {
    products : IProduct[],
}

interface props {
    children: JSX.Element[] | JSX.Element
}


export const ProviderProducts = ({ children }: props ) => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useLayoutEffect(() => {
    }, [])

    return(
        <ContextProducts.Provider value={{ products }}>
            { children }
        </ContextProducts.Provider>
    )
}