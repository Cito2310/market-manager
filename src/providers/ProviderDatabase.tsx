import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { formatProduct } from '../helpers/formatProduct';
import { sortCategories, sortProducts } from '../helpers/sortFunc';

import { IProductFormat } from '../../Types/product';
import { IRespCategories } from '../../Types/categories';




// TYPESCRIPT
interface IContextDatabase {
    categories: IRespCategories[],
    controllerCategories: IControllerCategories,

    product: IProductFormat[],
    controllerProducts: IControllerProducts,

    statusDB: TStatusDB,

    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>,
}
type TStatusDB = "await" | "online" | "offline";

export interface IControllerProducts {
    add: ( productFormat: IProductFormat ) => void
    delete: ( productFormat: IProductFormat ) => void
    modify: ( productFormat: IProductFormat ) => void
}

export interface IControllerCategories {
    add: (category: IRespCategories) => void
    delete: (category: IRespCategories) => void
    modify: (category: IRespCategories) => void
}

export const ContextDatabase = createContext({} as IContextDatabase)









// PROVIDER COMPONENT
interface props {  children: JSX.Element | JSX.Element[]  }
export const ProviderDatabase = ({ children }: props) => {
    const [statusDB, setStatusDB] = useState<TStatusDB>("await");
    const [token, setToken] = useState<string>("");
    const [product, setProduct] = useState<IProductFormat[]>([]);
    const [categories, setCategories] = useState<IRespCategories[]>([])
    
    // FUNC CALL API PRODUCTS
    const getProducts = () => {
        axios.get( "https://market-product-rest.onrender.com/api/product/" )
            .then(({ data }) => {
                window.electronAPI.saveDataProduct( token );
                setStatusDB("online");
                setProduct( data.map( formatProduct ).sort( sortProducts ) );
            })
            .catch( error => {
                console.log(error)
                setStatusDB("offline")
                const data = window.electronAPI.getDataProductsOffline();
                setProduct( data.map( formatProduct ).sort( sortProducts ) || [] );
            })
    }

    // GET CATEGORIES
    const getCategories = () => {
        if (!token) return;

        axios.get("https://market-product-rest.onrender.com/api/category/",{ headers: {token} })
            .then(({ data }:{data: IRespCategories[]}) => { setCategories(data.sort(sortCategories).map(category => ({...category, brands: category.brands.sort()})) ) })
            .catch( err => console.log(err) )
    }

    useEffect(() => { getProducts() }, [])
    useEffect(() => { getCategories() }, [token])

    // FUNC CONTROLLER PRODUCTS
    const controllerProducts: IControllerProducts = {
        add: ( productData ) => {
            const newListProduct = [...product, productData].sort(sortProducts);
            setProduct(newListProduct);
        },

        delete: ( productData ) => {
            setProduct( product.filter( productUnit => productUnit.barcode !== productData.barcode ) )
        },

        modify: ( productData ) => {
            const copyProduct = product.filter( productUnit => productUnit.barcode !== productData.barcode );
            const sortProduct = [...copyProduct, productData].sort(sortProducts);
            setProduct(sortProduct);
        },
    }

    // FUNC CONTROLLER CATEGORIES
    const controllerCategories: IControllerCategories = {
        add: ( categoryData ) => {
            const newCategories = [...categories, categoryData].sort(sortCategories).map(category => ({...category, brands: category.brands.sort()}));
            setCategories(newCategories);
        },

        delete: ( categoryData ) => {
            setCategories( categories.filter( i => i.category !== categoryData.category ) )
        },

        modify: ( categoryData ) => {
            const copyCategories = categories.filter( i => i.category !== categoryData.category )
            setCategories([...copyCategories, categoryData].sort(sortCategories).map(category => ({...category, brands: category.brands.sort()})));
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