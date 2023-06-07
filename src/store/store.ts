import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";

import { categorySlice } from './category';
import { authSlice } from './auth';
import { modalSlice } from './modal';
import { productSlice } from './product';
import { cashRegisterSlice } from './cashRegister';
import { printSlice } from './print';

export const store = configureStore({
    reducer: {
        category: categorySlice.reducer,
        auth: authSlice.reducer,
        modal: modalSlice.reducer,
        product: productSlice.reducer,
        cashRegister: cashRegisterSlice.reducer,
        print: printSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;