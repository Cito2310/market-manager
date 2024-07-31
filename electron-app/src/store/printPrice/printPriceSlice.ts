import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../../Types';

interface printPriceState {
    isActive: boolean;
    productsToPrint: Product | null;
}

const initialState: printPriceState = {
    isActive: false,
    productsToPrint: null,
}


export const printPriceSlice = createSlice({
    name: 'printPrice',
    initialState,
    reducers: {

        exitToPrint: ( state ) => {
            state.isActive = false;
        },

        setProductPrice: ( state, action: { payload: Product } ) => {
            state.isActive = true;
            state.productsToPrint = action.payload;
        },

    }
});

export const { exitToPrint, setProductPrice } = printPriceSlice.actions;