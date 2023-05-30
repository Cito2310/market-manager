import { fetchApi } from "../../helpers/fetchApi";
import { AppDispatch, RootState } from "../store";
import { stopLoading, initLoading, setProducts } from "./productSlice";

export const startCreateProduct = () => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        
        dispatch( initLoading() );
        dispatch( stopLoading() );

    };
};

export const startUpdateProductByBarcode = () => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        
        dispatch( initLoading() );
        dispatch( stopLoading() );

    };
};

export const startDeleteProductByBarcode = () => {
    return async( dispatch: AppDispatch, getState: () => RootState ) => {
        
        dispatch( initLoading() );
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