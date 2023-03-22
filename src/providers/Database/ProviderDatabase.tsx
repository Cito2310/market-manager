import { createContext, useState, useEffect } from 'react';
import axios from 'axios';


import { useInterval } from '../../hooks/useInterval';
import { formatProduct } from '../../helpers/formatProduct';
import { sortABCProducts } from '../../helpers/sortABCProducts';

import { IProductFormat } from '../../../Types/product';
import { IRespCategories } from '../../../Types/categories';

interface IContextDatabase {
    categories: IRespCategories[],
    controllerCategories: IControllerCategories,
    controllerProducts: IControllerProducts,
    product: IProductFormat[],
    setToken: React.Dispatch<React.SetStateAction<string>>,
    statusDB: TStatusDB,
    token: string,
}
type TStatusDB = "await" | "online" | "offline" | "checking";

interface IControllerProducts {
    add: ( productFormat: IProductFormat ) => void
    delete: ( productFormat: IProductFormat ) => void
    modify: ( productFormat: IProductFormat ) => void
}

export interface IControllerCategories {
    addNewCategory: (category: IRespCategories) => void
    deleteCategory: (category: IRespCategories) => void
    modifyCategory: (category: IRespCategories) => void
}


export const ContextDatabase = createContext({} as IContextDatabase)

interface props {  children: JSX.Element | JSX.Element[]  }
export const ProviderDatabase = ({ children }: props) => {
    const [statusDB, setStatusDB] = useState<TStatusDB>("await");
    const [token, setToken] = useState<string>("");
    const [product, setProduct] = useState<IProductFormat[]>([]);
    const [categories, setCategories] = useState<IRespCategories[]>([])
    
    // FUNC CALL API PRODUCTS
    const [firstCall, setFirstCall] = useState(true);
    const checkDB = () => {
        if ( !firstCall ) setStatusDB("checking");

        // call api get all product
        if ( firstCall ) {

            axios.get( "https://market-product-rest.onrender.com/api/product/" )
                .then(({ data }) => {
                    setFirstCall(false);
                    window.electronAPI.saveDataProduct( token );
                    setStatusDB("online");
                    setProduct( data.map( formatProduct ).sort( sortABCProducts ) );
                })
                .catch( error => {
                    console.log(error)
                    setStatusDB("offline")
                    const data = window.electronAPI.getDataProductsOffline();
                    setProduct( data.map( formatProduct ).sort( sortABCProducts ) );
                })


        } else {
            if ( !token ) return; // Check exist token
            axios.get("https://market-product-rest.onrender.com/api/product/7790580129705", { headers: { token } })
                .then(()=> { setStatusDB("online") })
                .catch((error)=> { console.log(error);setStatusDB("offline") })
        }
    
    }

    // GET CATEGORIES
    const getCategories = () => {
        if (!token) return;

        axios.get("https://market-product-rest.onrender.com/api/category/",{ headers: {token} })
            .then(({data}) => {
                setCategories(data);
            })
            .catch(err => console.log(err))
    }

    useInterval(checkDB, 300000 );
    useEffect(() => { checkDB(); getCategories() }, [token])

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

    // FUNC CONTROLLER CATEGORIES
    const controllerCategories: IControllerCategories = {
        addNewCategory: ( category ) => {
            const newCategories = [...categories, category].sort();
            setCategories(newCategories);
        },

        deleteCategory: ( category ) => {
            setCategories( categories.filter( i => i.category !== category.category ) )
        },

        modifyCategory: ( category ) => {
            const copyCategories = categories.filter( i => i.category !== category.category )
            const sortCategories = [...copyCategories, category]
            setCategories(sortCategories);
        },
    }

    // R E T U R N
    return (
        <ContextDatabase.Provider  value={{
            token, setToken,
            product, controllerProducts,
            statusDB, categories, controllerCategories
        }}>
            { children }
        </ContextDatabase.Provider>
    )
}