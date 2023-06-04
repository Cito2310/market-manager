import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../../Types/product';

interface productState {
    products: Product[];
    messageError: null | string;
    isCalled: boolean;
    status: {
        isLoading: boolean;
        hasError: boolean;
    }
}

const initialState: productState = {
    products: [],
    messageError: null,
    isCalled: false,
    status: {
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
            state.isCalled = true;
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

    }
});

export const { 
    createProducts, 
    deleteProductsByBarcode, 
    setProducts, 
    updateProductsByBarcode,
    initLoading,
    stopLoading,

} = productSlice.actions;