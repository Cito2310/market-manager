import { useEffect, useState } from 'react';
import axios from "axios";

import { detectKeyUp } from './detectKeyUp';

import { loginResp } from '../../Types/axiosResponse';
import { IProduct } from '../../Types/product';

export const ScreenCashRegister = () => {
    const [dataProduct, setDataProduct] = useState<IProduct[]>([]);
    const [barcode, setBarcode] = useState<string>("");

    useEffect(() => {
        const funcGetProducts = async() => {
            const resp: loginResp = await axios.post("https://market-product-rest.onrender.com/api/user/login", {
                username: "adminUser",
                password: "adminUser",
            })
            if (resp.status === 200) {
                const data = await window.electronAPI.saveDataProduct(resp.data.token);
                setDataProduct(data);
            }
        }
        funcGetProducts();
    }, [])

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


    return (
        <>
            <div>{JSON.stringify(dataProduct)}</div>
            <div>Hola: {barcode}</div>
        </>
    )
}