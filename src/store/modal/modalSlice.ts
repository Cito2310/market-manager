import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../../Types/product';

export type Modals = "createCategory" | "createProduct" | "updateProduct" | "deleteProduct";

interface modalState {
    current: null | Modals;
    productSelected: Product | null;
}

const initialState: modalState = {
    current: null,
    productSelected: null,
}


export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {

        selectProduct: ( state, action: { payload: Product } ) => {
            state.productSelected = action.payload;
        },

        exitModal: ( state ) => {
            state.current = null;
        },

        setModal: ( state, action: { payload: Modals } ) => {
            state.current = action.payload;
            state.productSelected = null;
        }

    }
});

export const { setModal, exitModal, selectProduct } = modalSlice.actions;