import { useEffect, useState } from "react"
import { useAppDispatch } from "../store";
import { startAddProductToCart } from "../store/cashRegister";

export const useDetectBarcode = ( currentKeypress: [string] ) => {
    const dispatch = useAppDispatch();
    const [barcode, setBarcode] = useState("");
    const [ key ] = currentKeypress;

    const resetBarcode = () => setBarcode("");

    const changeBarcode = () => {
        const newBarcode = barcode + key;
        setBarcode( newBarcode );

        if ( ![13, 8].includes( newBarcode.length ) ) return;

        if ( newBarcode.length === 13 ) resetBarcode();
        const foundProduct = dispatch( startAddProductToCart( newBarcode ) );

        if ( foundProduct ) resetBarcode();
    }

    useEffect(() => {
        if ( /[0-9]/.test( key ) ) changeBarcode();
        if (key === "Backspace") resetBarcode();


    }, [currentKeypress])

    return {
        barcode
    }
}