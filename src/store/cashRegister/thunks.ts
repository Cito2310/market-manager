import { Product } from "../../../Types/product";
import { AppDispatch, RootState } from "../store";
import { addProductUnitToCart, addProductWeightToCart } from "./cashRegisterSlice";

export const startAddProductToCart = (barcode: string) => {
    return ( dispatch: AppDispatch, getState: () => RootState ) => {

        const { products } = getState().product;

        // BARCODE IS WEIGHT PRODUCT
        if ( barcode.startsWith("20") && barcode.length === 13 ) {
            const prefix = barcode.slice(0,2);
            const idProduct = barcode.slice(2,7);
            const weight = Number( barcode.slice(7,12) );
            const weightToKg = weight / 1000;
    
            const findProduct = products.find( product => product.barcode === idProduct );

            if (!findProduct) return false; //TODO: Not Found Product

            dispatch( addProductWeightToCart({ 
                product: findProduct, 
                weight: weightToKg,
            }) )
            return true;
        }


        // BARCODE IS UNIT PRODUCT
        // CHECK EXIST PRODUCT
        const findProduct = products.find( product => product.barcode === barcode );
        if (!findProduct && barcode.length === 8 ) return false;

        // NOT FOUND PRODUCT
        if ( !findProduct ) return false; //TODO: Not Found Product

        // ADD PRODUCT INIT
        dispatch( addProductUnitToCart( findProduct ) );
        return true;

    };
};