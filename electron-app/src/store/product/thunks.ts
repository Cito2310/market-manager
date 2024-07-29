import { fetchApi } from "../../helpers";
import { AppDispatch, RootState } from "../store";
import { setProducts, createProducts, deleteProductsByBarcode, setOnline, setError, setLoading, updateProductsByBarcode  } from "./productSlice";
import { FormCreateProduct, FormUpdateProduct, Product } from '../../../Types';

export const startCreateProduct = ( formData: FormCreateProduct ) => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        dispatch( setLoading(true) );

        const { token } = getState().auth;

        try {
            const data = await fetchApi({ 
                method: "post",
                path: "api/product",
                body: formData,
                token: token!,
            })

            dispatch( createProducts(data) );

        } catch (error) {}

        dispatch( setLoading(false) );
    };
};

export const startUpdateProductByBarcode = ( barcode: string, dataForm: FormUpdateProduct ) => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        dispatch( setLoading(true) );
        
        const { token } = getState().auth;
        
        try {
            const data: Product = await fetchApi({
                method: "put",
                path: `api/product/${barcode}`,
                body: dataForm,
                token: token!
            })
            dispatch(updateProductsByBarcode({ barcode, productUpdate: data }))

        } catch (error) {}
                
        dispatch( setLoading(false) );
    };
};

export const startDeleteProductByBarcode = ( barcode: string ) => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        dispatch( setLoading(true) );
        
        const { token } = getState().auth;

        await fetchApi({
            method: "delete",
            path: `api/product/${barcode}`,
            token: token!
        })

        dispatch( deleteProductsByBarcode( barcode ) );
        dispatch( setLoading(false) );
    };
};

export const startGetProducts = () => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        dispatch( setLoading(true) );

        const offlineProducts = await window.electronAPI.getDataProductsOffline();
        dispatch( setProducts( offlineProducts ) );

        try {
            const products = await fetchApi({
                method: "get",
                path: "api/product",
            })
            await window.electronAPI.saveDataProduct( products )
    
            dispatch( setProducts( products ) );
            dispatch( setOnline() );
            
        } catch (error) {}

        dispatch( setLoading(false) );
    };
};