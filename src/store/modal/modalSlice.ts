import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../../Types/product';

export type Modals = "createCategory" | "createProduct" | "updateProduct" | "deleteProduct";

interface modalState {
    current: null | Modals;
    selectedProduct: Product | null;
}

const initialState: modalState = {
    current: null,
    selectedProduct: null,
}


export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {

        selectProduct: ( state, action: { payload: Product } ) => {
            state.selectedProduct = action.payload;
        },

        exitModal: ( state ) => {
            state.current = null;
            state.selectedProduct = null;
        },

        setModal: ( state, action: { payload: Modals } ) => {
            state.current = action.payload;
        }

    }
});

export const { setModal, exitModal, selectProduct } = modalSlice.actions;