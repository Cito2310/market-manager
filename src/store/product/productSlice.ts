import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../../Types';

interface productState {
    products: Product[];
    messageError: null | string;
    status: {
        hasError: boolean;
        isCalled: boolean;
        isLoading: boolean;
        isOnline: boolean;
    }
}

const initialState: productState = {
    products: [],
    messageError: null,
    status: {
        isCalled: false,
        isOnline: false,
        isLoading: false,
        hasError: false
    }
}


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

        setProducts: ( state, action: { payload: Product[] } ) => {
            state.products = action.payload;
            state.status.isCalled = true;
        },

        createProducts: ( state, action: { payload: Product } ) => {
            state.products.push( action.payload )
        },

        updateProductsByBarcode: ( state, action: { payload: { barcode: string, productUpdate: Product } } ) => {
            state.products = state.products.map( product => 
                ( product.barcode === action.payload.barcode ) ? action.payload.productUpdate : product
            )
        },

        deleteProductsByBarcode: ( state, action: { payload: string } ) => {
            state.products = state.products.filter( product => product.barcode !== action.payload )
        },

        initLoading: ( state ) => { state.status.isLoading = true },
        stopLoading: ( state ) => { state.status.isLoading = false },
        setOnline: ( state ) => { state.status.isOnline = true },

    }
});

export const { 
    createProducts, 
    deleteProductsByBarcode, 
    setProducts, 
    updateProductsByBarcode,
    initLoading,
    stopLoading,
    setOnline,

} = productSlice.actions;