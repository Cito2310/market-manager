import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../../Types';

export type ModalsCategory = "createCategory";
export type ModalsProduct = "createProduct" | "updateProduct" | "deleteProduct";
export type ModalsCashRegister = "notFoundProduct" | "resetCart";

export type Modals = ModalsCashRegister | ModalsCategory | ModalsProduct;

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

        setModalCategory: ( state, action: { payload: ModalsCategory } ) => {
            state.current = action.payload;
        },

        setModalProduct: ( state, action: { payload: ModalsProduct } ) => {
            state.current = action.payload;
        },

        setModalCashRegister: ( state, action: { payload: ModalsCashRegister } ) => {
            state.current = action.payload;
        },

        selectProduct: ( state, action: { payload: Product } ) => {
            state.selectedProduct = action.payload;
        },

        exitModal: ( state ) => {
            state.current = null;
            state.selectedProduct = null;
        },
    }
});

export const { setModalCashRegister, setModalCategory, setModalProduct, exitModal, selectProduct } = modalSlice.actions;