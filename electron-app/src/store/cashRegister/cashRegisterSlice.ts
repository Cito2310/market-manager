import { createSlice } from '@reduxjs/toolkit';
import { Product, ProductInCart } from '../../../Types';

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


        addProductToCart: ( state, action: { payload: { product: Product, weight?: number } } ) => {
            const { product, weight } = action.payload;

            const existProductInCart = state.productsCart.find( productInCart => productInCart.barcode === product.barcode );

            if (weight && existProductInCart === undefined) {
                const newProduct: ProductInCart = {...product, amount: weight}
                state.productsCart.push( newProduct );
                return;
            }

            if ( existProductInCart === undefined ) {
                const newProduct: ProductInCart = { ...product, amount: 1 };
                state.productsCart.push( newProduct );
                return;
            }

            state.productsCart = state.productsCart.map( productInCart => {
                if ( productInCart.barcode !== existProductInCart?.barcode ) return productInCart;
                return {...productInCart, amount: productInCart.type === "unit" ? productInCart.amount + 1 : productInCart.amount + weight! };
            })

        },


        resetCart: ( state ) => {
            state.productsCart = [];
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
    addProductToCart, 
    deleteProductInCartByBarcode, 
    removeError, 
    resetCart,
    setNotFoundProduct,

} = cashRegisterSlice.actions;