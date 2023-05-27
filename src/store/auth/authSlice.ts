import { createSlice } from '@reduxjs/toolkit';

interface authState {
    token: string | null;
    status: {
        isLoading: boolean;
        hasError: boolean;
    }
}

const initialState: authState = {
    token: null,
    status: {
        isLoading: false,
        hasError: false,
    }
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setToken: ( state, action: { payload: string } ) => {
            state.token = action.payload
        },

        initLoading: ( state ) => { state.status.isLoading = true },
        stopLoading: ( state ) => { state.status.isLoading = false },
        setError: ( state ) => { state.status.hasError = true },

    }
});

export const {
    initLoading,
    setError,
    setToken,
    stopLoading
    
} = authSlice.actions;