import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { formatProduct } from '../../helpers/formatProduct';
import { sortABCProducts } from '../../helpers/sortABCProducts';

import { IProductFormat } from '../../../Types/product';

interface IContextDatabase {
    controllerProducts: IControllerProducts,
    product: IProductFormat[],
    setToken: React.Dispatch<React.SetStateAction<string>>,
    statusDB: TStatusDB,
    token: string,
}
type TStatusDB = "await" | "online" | "offline";

interface IControllerProducts {
    add: ( productFormat: IProductFormat ) => void
    delete: ( productFormat: IProductFormat ) => void
    modify: ( productFormat: IProductFormat ) => void
}


export const ContextDatabase = createContext({} as IContextDatabase)

interface props {  children: JSX.Element | JSX.Element[]  }
export const ProviderDatabase = ({ children }: props) => {
    const [statusDB, setStatusDB] = useState<TStatusDB>("await");
    const [token, setToken] = useState<string>("");
    const [product, setProduct] = useState<IProductFormat[]>([])
    
    // FUNC CALL API PRODUCTS
    const [firstCall, setFirstCall] = useState(true);
    const checkDB = () => {
        // call api get all product
        if ( firstCall ) {

            axios.get( "https://market-product-rest.onrender.com/api/product/7623201814851", { headers: { token } })
                .then(({ data }) => {
                    setFirstCall(false);
                    window.electronAPI.saveDataProduct( token );
                    setStatusDB("online");
                    setProduct( data.map( formatProduct ).sort( sortABCProducts ) );
                })
                .catch( error => {
                    setStatusDB("offline")
                    // TODO electronAPI.getDataProduct
                })

        } else {
            axios.get("https://market-product-rest.onrender.com/api/product/7623201814851", { headers: { token } })
                .then(()=> { setStatusDB("online") })
                .catch(()=> { setStatusDB("offline") })
        }
    }
    useEffect(() => {
        if ( !token ) return;

        checkDB();
        setInterval(checkDB, 300000 );
    }, [token])

    // FUNC CONTROLLER PRODUCTS
    const controllerProducts: IControllerProducts = {
        add: ( productFormat ) => {
            const newListProduct = [...product, productFormat].sort(sortABCProducts);
            setProduct(newListProduct);
        },

        delete: ( productFormat ) => {
            setProduct( product.filter( productUnit => productUnit.barcode !== productFormat.barcode ) )
        },

        modify: ( productFormat ) => {
            const copyProduct = product.filter( productUnit => productUnit.barcode !== productFormat.barcode );
            const sortProduct = [...copyProduct, productFormat].sort(sortABCProducts);
            setProduct(sortProduct);
        },
    }

    // R E T U R N
    return (
        <ContextDatabase.Provider  value={{
            token, setToken,
            product, controllerProducts,
            statusDB,
        }}>
            { children }
        </ContextDatabase.Provider>
    )
}