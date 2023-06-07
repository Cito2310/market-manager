import { fetchApi } from "../../helpers";
import { AppDispatch, RootState } from "../store";
import { stopLoading, initLoading, setProducts, createProducts, deleteProductsByBarcode, setOnline } from "./productSlice";
import { FormCreateProduct, FormUpdateProduct } from '../../../Types';

export const startCreateProduct = ( formData: FormCreateProduct ) => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        
        dispatch( initLoading() );

        const { token } = getState().auth;

        const data = await fetchApi({ 
            method: "post",
            path: "api/product",
            body: formData,
            token: token!,
        })

        dispatch( createProducts(data) );
        dispatch( stopLoading() );

    };
};

export const startUpdateProductByBarcode = ( barcode: string, dataForm: FormUpdateProduct ) => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        
        dispatch( initLoading() );

        const { token } = getState().auth;

        await fetchApi({
            method: "put",
            path: `api/product/${barcode}`,
            body: dataForm,
            token: token!
        })

        dispatch( stopLoading() );

    };
};

export const startDeleteProductByBarcode = ( barcode: string ) => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        
        dispatch( initLoading() );

        const { token } = getState().auth;

        await fetchApi({
            method: "delete",
            path: `api/product/${barcode}`,
            token: token!
        })

        dispatch( deleteProductsByBarcode( barcode ) );
        dispatch( stopLoading() );

    };
};

export const startGetProducts = () => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        dispatch( initLoading() );

        try {
            const products = await fetchApi({
                method: "get",
                path: "api/product",
            })
            await window.electronAPI.saveDataProduct( products )
    
            dispatch( setProducts( products ) );
            dispatch( setOnline() );
            
        } catch (error) {
            const offlineProducts = await window.electronAPI.getDataProductsOffline();
            dispatch( setProducts( offlineProducts ) );
        }

        dispatch( stopLoading() );
    };
};