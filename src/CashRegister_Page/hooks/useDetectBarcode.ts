import { useEffect, useState } from "react"
import { Product } from "../../../Types/product";
import { useAppDispatch } from "../../store/store";
import { addProductToCart } from "../../store/cashRegister/cashRegisterSlice";

export const useDetectBarcode = ( currentKeypress: [string], products: Product[] ) => {
    const dispatch = useAppDispatch();
    const [barcode, setBarcode] = useState("");
    const [ key ] = currentKeypress;

    const resetBarcode = () => setBarcode("");

    const changeBarcode = () => {
        if ( !/[0-9]/gi.test( key ) ) return;

        const newStateBarcode = barcode + key;
        setBarcode( newStateBarcode );

        if ( ![13, 8].includes( newStateBarcode.length ) ) return;

        if ( newStateBarcode.length === 13 ) resetBarcode();

        const findProduct = products.find( product => product.barcode === newStateBarcode );
        if (!findProduct && newStateBarcode.length === 8 ) return;
         
        // if ( !findProduct ) throw new Error("NOT IMPLEMENTED: Not Exist Product");
        dispatch( addProductToCart( findProduct! ) );
    }

    useEffect(() => {
        changeBarcode()
    }, [currentKeypress])

    return {
        barcode
    }
}