import { createSlice } from '@reduxjs/toolkit';
import { ProductInCart } from '../../../Types';

interface printState {
    isActive: boolean;
    productsToPrint: ProductInCart[];
}

const initialState: printState = {
    isActive: false,
    productsToPrint: [],
}


export const printSlice = createSlice({
    name: 'print',
    initialState,
    reducers: {

        exitToPrint: ( state ) => {
            state.isActive = false;
        },

        setPrint: ( state, action: { payload: ProductInCart[] } ) => {
            state.isActive = true;
            state.productsToPrint = action.payload;
        },

    }
});

export const { exitToPrint, setPrint } = printSlice.actions;