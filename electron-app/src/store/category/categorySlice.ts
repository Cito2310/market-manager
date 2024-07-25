import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../../Types';

interface categoryState {
    data: Category[];
    messageError: string | null;
    wasCalledOnce: boolean;
    status: {
        hasError: boolean;
        isLoading: boolean;
    }
}

const initialState: categoryState = {
    data: [],
    messageError: null,
    wasCalledOnce: false,
    status: {
        hasError: false,
        isLoading: false,
    }
}


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

        setCategories: ( state, action: { payload: Category[] } ) => {
            state.data = action.payload
        },

        createCategory: ( state, action: { payload: Category } ) => {
            state.data.push( action.payload );
        },

        deleteCategoryById: ( state, action: { payload: string } ) => {
            state.data = state.data.filter( category => category._id !== action.payload );
        },

        updateCategory: ( state, action: { payload: Category } ) => {
            state.data = state.data.map( category => {
                if ( category._id === action.payload._id ) return action.payload;
                return category;
            })
        },

        initLoading: ( state ) => { state.status.isLoading = true },
        stopLoading: ( state ) => { state.status.isLoading = false },
        setError: ( state, action: { payload: string } ) => {
            state.status.hasError = true,
            state.messageError = action.payload
        },

    }
});

export const { 
    setCategories,
    createCategory,
    deleteCategoryById,
    initLoading,
    setError,
    stopLoading,
    updateCategory

} = categorySlice.actions;