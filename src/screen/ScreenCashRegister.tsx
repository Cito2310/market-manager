import { useContext, useState, useEffect, useCallback, KeyboardEvent } from 'react';

import { priceFormat } from '../helpers/priceFormat';
import { detectKeyUp } from "../helpers/detectKeyUp";

import { ContextDatabase, ContextPrint, ContextModal } from '../providers';

import { InputText, SvgElements } from '../components/';

import { IProductWithAmount, IProductFormat } from '../../Types/product';

import "../styles/screen-cash-register.scss"


export const ScreenCashRegister = () => {
    const { setCurrentModal } = useContext(ContextModal);
    const { product } = useContext(ContextDatabase);
    const { setProductToPrint, onScreenPrint } = useContext( ContextPrint );

    const [barcode, setBarcode] = useState<string>("");
    const [shoppingCart, setShoppingCart] = useState<IProductWithAmount[]>([]);
    
    const onPrint = () => {
        setProductToPrint(shoppingCart);
        onScreenPrint();
    }
    
    const onToggleNotFoundModal = () => {
        setCurrentModal('not-found');
        setTimeout(()=>{setCurrentModal("none")}, 800);
    }
    
    const onClearShoppingCart = () => {setShoppingCart([])};
    
    const deleteProduct = ( barcode: string ) => {
        const newShoppingCart = [...shoppingCart].filter( value => value.barcode !== barcode );
        setShoppingCart( newShoppingCart );
    }
    
    
    // DETECT KEY PRESS
    const [currentKeyPress, setCurrentKeyPress] = useState([""]);
    useEffect(() => {
        const handleKeyDown = (event:any) => {
            if (/^[0-9]+$|Backspace/.test(event.key)) setCurrentKeyPress([event.key])
        }
        document.addEventListener("keyup", handleKeyDown);
        return () => document.removeEventListener("keyup", handleKeyDown);
      }, []);

    //   ACTION WHEN PRESS KEY
    useEffect(() => {
        if ( /^[0-9]+$/g.test(currentKeyPress[0]) ) setBarcode(barcode + currentKeyPress);
        if ( /Backspace/g.test(currentKeyPress[0]) ) setBarcode("");
    }, [currentKeyPress])


    //   DETECT PRODUCT BARCODE
    useEffect(() => {
        console.log(barcode)
        if ( barcode.length === 13 || barcode.length === 8 ) {

            // check exist product in shopping cart
            const existShoppinCartIndex = shoppingCart.findIndex( value => value.barcode === barcode );
            
            // when exist product in shopping cart - add amount to product
            if (existShoppinCartIndex !== -1) {
                let newShoppingCart = [...shoppingCart];
                newShoppingCart[existShoppinCartIndex].amount++;
                setShoppingCart(newShoppingCart);
                setBarcode("");

            } else {
                // when not exist product in shopping cart - add new product to shopping cart
                const existProduct = product.find( value => value.barcode === barcode );
                
                // when not exist product in database
                if ( !existProduct && barcode.length === 13 ) {
                    onToggleNotFoundModal();
                    setBarcode("");
                } 

                // add product to shopping cart
                if (existProduct) {
                    const productSelectWithAmount: IProductWithAmount = {...existProduct as IProductFormat, amount: 1};
                    setShoppingCart([...shoppingCart, productSelectWithAmount]);
                    setBarcode("");
                }
            }
        }        
    }, [barcode])
      

    return (
        <div className='screen-cash-register'>
            <section className='section-shopping-cart'>
                <ul>
                    <li className='product-item top'>
                        <p>PRODUCTO</p>
                        <p>CATEGORIA</p>
                        <p className='center'>PRECIO X U</p>
                        <p className='center'>CANTIDAD</p>
                        <p className='center'>TOTAL</p>
                    </li>

                    { shoppingCart.map( 
                            ({ barcode, category, brand, name, price, amount, sizeUnit }) => <li key={barcode} className='product-item'>
                                <p>{`${brand} ${name} ${sizeUnit[0]+sizeUnit[1]}`}</p>
                                <p>{category}</p>
                                <p className='center'>{`$ `+priceFormat( price )}</p>
                                <p className='center'>{amount}</p>
                                <p className='center'>{`$ `+priceFormat( amount*price )}</p>
                                <button onClick={()=>{ deleteProduct(barcode) }}><SvgElements element='xmark' /></button>
                            </li>
                    ) }
                </ul>
            </section>

            <section className='section-sidebar'>
                <div className='column div-button'>
                    <InputText 
                        name='barcode' 
                        onChange={()=>{}} 
                        placeholder="Ingresar codigo de barra" 
                        value={barcode}/>

                    <button 
                        disabled={ shoppingCart.length === 0 ? true : false } 
                        className='btn white btn-print center' 
                        onClick={onPrint}
                    >
                            Imprimir Ticket
                    </button>

                    <button 
                        disabled={ shoppingCart.length === 0 ? true : false } 
                        className='btn white btn-print center' 
                        onClick={onClearShoppingCart}
                    >
                            Borrar todo
                    </button>
                </div>

                <div className='column div-total'>
                    <p>TOTAL</p>
                    <p>$ { priceFormat(shoppingCart.reduce((prev, curr) => prev + curr.price*curr.amount,0)) }</p>
                </div>
            </section>
        </div>
    )
}