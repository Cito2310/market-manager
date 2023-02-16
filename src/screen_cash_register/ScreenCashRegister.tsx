import { useEffect, useState } from 'react';
import axios from "axios";

import { detectKeyUp } from './detectKeyUp';

import { loginResp } from '../../Types/axiosResponse';

export const ScreenCashRegister = () => {
    const [barcode, setBarcode] = useState<string>("");

    useEffect(() => {
        detectKeyUp(
            (event)=>{setBarcode(barcode + event!.key)},
            /^[0-9]+$/g
        )
        if (barcode.length === 13) {
            // TODO Implementar : Buscar producto en base de datos y añadir a la lista de compra
            console.log(barcode); // TEST DEBUG
            setBarcode("");
        }
    }, [barcode])

    const onTest = async() => {
        const resp: loginResp = await axios.post("https://market-product-rest.onrender.com/api/user/login", {
            username: "adminUser",
            password: "adminUser",
        })
        if ( resp.status === 200 ) {
            // @ts-ignore
            window.electronApi.saveProductsList(resp.data.token)
        }
    }

    return (
        <>
        <button onClick={onTest} >CLICK</button>
        <div>Hola: {barcode}</div>
        </>
    )
}