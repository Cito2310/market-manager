import { useContext, useEffect, useState } from 'react';

import { ContextBarcode } from '../Provider/ProviderInputBarcode';
import { ContextProducts } from '../Provider/ProviderProducts';

import { IProduct } from '../interfaces/IProduct';
import { existArrayObject } from '../helpers/existArrayObject';

interface IProductWithAmount extends IProduct {
    amount?: number
}

export const ScreenCashRegister = () => {
    const { barcode, setBarcode } = useContext(ContextBarcode);
    const { products } = useContext(ContextProducts);
    const [listProduct, setListProduct] = useState<IProductWithAmount[] | []>([])
    
    useEffect(() => {
        if (barcode.length === 13) {
            const product = products.find( product => product.barcode === barcode);
            if (product) {
                const indexProductList = existArrayObject(listProduct, product) // check exist product in listProduct

                if ( indexProductList >= 0 ) {
                    const amountProduct = listProduct[indexProductList].amount;
                    listProduct[indexProductList].amount = amountProduct ? amountProduct + 1 : 2;

                } else {
                    setListProduct([...listProduct, { ...product }]);
                }
                setBarcode("");
            }
        }
    }, [barcode])

    const getTotalPrices = (): number => {
        const arrPricesAmount: [number, number][] = listProduct.map(product => [product.price, product.amount || 1]); 
        return arrPricesAmount.reduce((acc, cur) => acc + (cur[0]*cur[1]), 0
        )
    }
    
    return (
        <>
            <div>{barcode}</div>

            <ul>
                {
                    listProduct.map(({ brand, size, type, price, barcode, amount }) => (
                        <li key={barcode+"key"}>
                            <h2>{ brand }</h2>
                            <h3>{ type + " " + size }</h3>
                            <p>Precio por unidad: { price }</p>
                            <p>Cantidad: { amount || 1 }</p>
                            <p>Precio Final: { price * (amount || 1)  }</p>
                        </li>
                    ))
                }
            </ul>

            <div>
                <h2>
                    Total: { getTotalPrices() }
                </h2>
            </div>
        
        </>

        
    )
}