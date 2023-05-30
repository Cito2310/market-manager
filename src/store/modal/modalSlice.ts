import { createSlice } from '@reduxjs/toolkit';

export type Modals = "createCategory" | "searchCategory";

interface modalState {
    current: null | Modals;
}

const initialState: modalState = {
    current: "searchCategory",
}


export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {

        exitModal: ( state ) => {
            state.current = null;
        },

        setModal: ( state, action: { payload: Modals } ) => {
            state.current = action.payload;
        }

    }
});

export const { setModal, exitModal } = modalSlice.actions;