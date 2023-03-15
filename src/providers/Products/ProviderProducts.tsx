import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { useResponseState } from '../../hooks/useResponseState';

import { IProductFormat, IProduct } from '../../../Types/product';
import { IRespState } from '../../../Types/respState';
import { formatProduct } from '../../helpers/formatProduct';

interface InterfaceContextProducts {
    products: IProductFormat[] | [],
    controllerProducts: IControllerProducts,
    setToken: React.Dispatch<React.SetStateAction<string>>,
    token: string,
    respStateProducts: IRespState,
}

interface IControllerProducts {
    add: ( productFormat: IProductFormat ) => void
    delete: ( productFormat: IProductFormat ) => void
    modify: ( productFormat: IProductFormat ) => void
}



const sortFuncProducts = (a: IProductFormat, b: IProductFormat) => {
    const joinNameA = `${a.category} ${a.brand} ${a.name} ${a.size}`;
    const joinNameB = `${b.category} ${b.brand} ${b.name} ${b.size}`;

    if ( joinNameA < joinNameB ) return -1;
    if ( joinNameA > joinNameB ) return 1;

    return 0;
}

interface props {  children: JSX.Element | JSX.Element[]  }

export const ContextProducts = createContext({} as InterfaceContextProducts);


export const ProviderProducts = ({children}: props) => {
    const [products, setProducts] = useState< IProductFormat[] >([]);
    const [token, setToken] = useState("");
    const { respState, controllerRespState } = useResponseState();

    useEffect(() => {
        if (token.length === 0) return;

        console.log("Realizando fetch"); // DEV

        controllerRespState.setStatusAwait();
        axios.get(
            "https://market-product-rest.onrender.com/api/product/",
            { headers: { token }}
        )
            .then(({ data }: { data:IProduct[] }) => {
                controllerRespState.setStatusDone();
                const sortProducts = data.map( formatProduct ).sort( sortFuncProducts );
                setProducts( sortProducts );
            })

            .catch( error => {
                controllerRespState.setStatusError("Error");
            })
    }, [token])
    

    const controllerProducts: IControllerProducts = {
        add: ( productFormat ) => {
            const newListProduct = [...products, productFormat].sort(sortFuncProducts);
            setProducts(newListProduct);
        },

        delete: ( productFormat ) => {
            setProducts( products.filter( product => product.barcode !== productFormat.barcode ) )
        },

        modify: ( productFormat ) => {
            setProducts([...products, ])
        },
    }
    
    return (
        <ContextProducts.Provider value={{
            controllerProducts,
            products,
            respStateProducts: respState,
            setToken,
            token,
        }}>
            {children}
        </ContextProducts.Provider>
    )
}