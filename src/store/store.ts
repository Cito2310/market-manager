import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from './category/categorySlice';
import { authSlice } from './auth/authSlice';
import { modalSlice } from './modal/modalSlice';

export const store = configureStore({
    reducer: {
        category: categorySlice.reducer,
        auth: authSlice.reducer,
        modal: modalSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;