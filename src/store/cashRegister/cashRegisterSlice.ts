import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../../Types/product';
import { ProductInCart } from '../../../Types/ProductInCart';

interface cashRegisterState {
    productsCart: ProductInCart[];
    status: {
        notFoundProduct: boolean;
    }
}

const initialState: cashRegisterState = {
    productsCart: [],
    status: {
        notFoundProduct: false,
    }
}


export const cashRegisterSlice = createSlice({
    name: 'cashRegister',
    initialState,
    reducers: {

        deleteProductInCartByBarcode: ( state, action: { payload: string } ) => {
            state.productsCart = state.productsCart.filter( product => product.barcode !== action.payload );
        },

        addProductUnitToCart: ( state, action: { payload: Product } ) => {
            const existProductInCart = state.productsCart.find( productInCart => productInCart.barcode === action.payload.barcode );

            if ( existProductInCart === undefined ) {
                const newProduct: ProductInCart = { ...action.payload, amount: 1 };
                state.productsCart.push( newProduct );
                return;
            }

            state.productsCart = state.productsCart.map( productInCart => {
                if ( productInCart.barcode !== existProductInCart?.barcode ) return productInCart;
                return {...productInCart, amount: productInCart.amount + 1 };
            })

        },

        addProductWeightToCart: ( state, action: { payload: { product: Product, weight: number } } ) => {
            const { product, weight } = action.payload;

            const existProductInCart = state.productsCart.find( productInCart => productInCart.barcode === product.barcode );

            if ( existProductInCart === undefined ) {
                const newProduct: ProductInCart = { ...product, amount: weight };
                state.productsCart.push( newProduct );
                return;
            }

            state.productsCart = state.productsCart.map( productInCart => {
                if ( productInCart.barcode !== existProductInCart?.barcode ) return productInCart;

                return {...productInCart, amount: productInCart.amount + action.payload.weight };
            })
        },

        setNotFoundProduct: ( state ) => {
            state.status.notFoundProduct = true;
        },

        removeError: ( state ) => {
            state.status.notFoundProduct = false;
        }
    }
});

export const { 
    addProductUnitToCart, 
    deleteProductInCartByBarcode, 
    removeError, 
    setNotFoundProduct,
    addProductWeightToCart,

} = cashRegisterSlice.actions;