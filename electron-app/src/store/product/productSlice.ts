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
            const findProductIndex = state.products.findIndex( product => product.barcode === action.payload.barcode );

            if (findProductIndex !== -1) state.products[findProductIndex] = action.payload.productUpdate;
        },

        deleteProductsByBarcode: ( state, action: { payload: string } ) => {
            state.products = state.products.filter( product => product.barcode !== action.payload )
        },

        setLoading: (state, action: {payload: boolean}) => { state.status.isLoading = action.payload },
        setError: (state, action: {payload: boolean}) => { state.status.hasError = action.payload },
        setOnline: ( state ) => { state.status.isOnline = true },

    }
});

export const { 
    createProducts, 
    deleteProductsByBarcode, 
    setProducts, 
    updateProductsByBarcode,
    setOnline,
    setError,
    setLoading,

} = productSlice.actions;