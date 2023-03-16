import { useContext, useState, useEffect } from 'react';

import { priceFormat } from '../helpers/priceFormat';
import { detectKeyUp } from "../helpers/detectKeyUp";

import { ContextDatabase } from '../providers/Database/ProviderDatabase';

import { ModalNotFoundProduct } from '../components/';

import { IProductWithAmount, IProductFormat } from '../../Types/product';

import "../styles/screen-cash-register.scss"


export const ScreenCashRegister = () => {
    const { product } = useContext(ContextDatabase);
    const [barcode, setBarcode] = useState<string>("");
    const [shoppingCart, setShoppingCart] = useState<IProductWithAmount[]>([]);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        detectKeyUp(
            (event)=>{setBarcode(barcode + event!.key)},
            /^[0-9]+$/g
        )
        
        if (barcode.length === 13) {
            const existShoppinCartIndex = shoppingCart.findIndex( value => value.barcode === barcode );
            
            if (existShoppinCartIndex !== -1) {
                let newShoppingCart = [...shoppingCart];
                newShoppingCart[existShoppinCartIndex].amount++;
                setShoppingCart(newShoppingCart);
                

            } else {
                const productSelect = product.find( value => value.barcode === barcode );

                if (!productSelect) { 
                    setNotFound(true);
                    setTimeout(()=>{setNotFound(false)}, 800);
                    setBarcode("");
                    return;
                }

                const productSelectWithAmount: IProductWithAmount = {...productSelect as IProductFormat, amount: 1};
                setShoppingCart([...shoppingCart, {...productSelectWithAmount}]);
            }

            setBarcode("");
        }

    }, [barcode])


    return (
        <div className='screen-cash-register'>
            { notFound ? <ModalNotFoundProduct/> : null }

            <section className='section-shopping-cart'>
                <ul>
                    <li className='product-item product-item-top'>
                        <p className='product-item-text'>PRODUCTO</p>
                        <p className='product-item-text'>CATEGORIA</p>
                        <p className='product-item-text'>PRECIO X U</p>
                        <p className='product-item-text'>CANTIDAD</p>
                        <p className='product-item-text'>TOTAL</p>
                    </li>

                    { shoppingCart.map( 
                            ({ barcode, category, brand, name, price, amount, sizeUnit }) => <li key={barcode} className='product-item'>
                                <p className='product-item-text'>{`${brand} ${name} ${sizeUnit[0]+sizeUnit[1]}`}</p>
                                <p className='product-item-text'>{category}</p>
                                <p className='product-item-text'>{`$ `+priceFormat( price )}</p>
                                <p className='product-item-text'>{amount}</p>
                                <p className='product-item-text'>{`$ `+priceFormat( amount*price )}</p>
                            </li>
                    ) }
                </ul>
            </section>

            <section className='section-total'>
                <p className='total-price'>
                    TOTAL : $ { priceFormat(shoppingCart.reduce((prev, curr) => prev + curr.price*curr.amount,0)) }
                </p>
            </section>
        </div>
    )
}