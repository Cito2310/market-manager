import { fetchApi } from "../../helpers/fetchApi";
import { AppDispatch, RootState, useAppSelector } from "../store";
import { stopLoading, initLoading, setProducts, createProducts, deleteProductsByBarcode } from "./productSlice";
import { FormCreateProduct, FormUpdateProduct } from '../../../Types/formData';

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

        const products = await fetchApi({
            method: "get",
            path: "api/product",
        })

        dispatch( setProducts( products ) )
        dispatch( stopLoading() );

    };
};