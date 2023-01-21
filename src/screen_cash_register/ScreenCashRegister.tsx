import { useContext, useEffect } from 'react';

import { ContextBarcode } from '../Provider/ProviderInputBarcode';
import { ContextProducts } from '../Provider/ProviderProducts';

export const ScreenCashRegister = () => {
    const { barcode } = useContext(ContextBarcode);
    const { products } = useContext(ContextProducts);
    // @ts-ignore
    useEffect(()=>{
        const callApiProduct = async() => {
            // @ts-ignore
            console.log(await window.electron.readApi());
        }
        callApiProduct()
    },[])
    
    return (
        <div>{barcode}</div>
    )
}