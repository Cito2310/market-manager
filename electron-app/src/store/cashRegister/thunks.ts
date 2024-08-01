import { setModalCashRegister } from "../modal";
import { AppDispatch, RootState } from "../store";
import { addProductToCart } from "./cashRegisterSlice";

export const startAddProductToCart = (barcode: string) => {
    return ( dispatch: AppDispatch, getState: () => RootState ) => {

        const { products } = getState().product;

        // BARCODE IS WEIGHT PRODUCT
        if ( barcode.startsWith("20") && barcode.length === 13 ) {
            const prefix = barcode.slice(0,2);
            const idProduct = barcode.slice(2,7);
            const weight =  Number( barcode.slice(7,12)) /1000;
    
            const findProduct = products.find( product => product.barcode === idProduct );

            if (!findProduct) {
                dispatch( setModalCashRegister("notFoundProduct") );
                return false;
            }

            dispatch( addProductToCart({ 
                product: findProduct, 
                weight: weight,
            }) )
            return true;
        }


        // BARCODE IS UNIT PRODUCT
        // CHECK EXIST PRODUCT
        const findProduct = products.find( product => product.barcode === barcode );
        if (!findProduct && barcode.length === 8 ) return false;

        // NOT FOUND PRODUCT
        if ( !findProduct ) {
            dispatch( setModalCashRegister("notFoundProduct") );
            return false;
        }

        // ADD PRODUCT INIT
        dispatch( addProductToCart({ product: findProduct }) );
        return true;

    };
};