import { useEffect, useState } from 'react';

import { detectKeyUp } from './detectKeyUp';

export const ScreenCashRegister = () => {
    const [barcode, setBarcode] = useState<string>("");

    useEffect(() => {
        detectKeyUp(
            (event)=>{setBarcode(barcode + event!.key)},
            /^[0-9]+$/g
        )
        if (barcode.length === 13) {
            // TODO Implementar : Union a la API de los productos 
            console.log(barcode); // TEST DEBUG
            setBarcode("");
        }
    }, [barcode])


    return <div>Hola: {barcode}</div>
}