import { useContext, useState, useEffect, useCallback, KeyboardEvent } from 'react';

import { priceFormat } from '../helpers/priceFormat';
import { detectKeyUp } from "../helpers/detectKeyUp";

import { ContextDatabase, ContextPrint, ContextModal } from '../providers';

import { InputNumber, InputText, SvgElements } from '../components/';

import { IProductWithAmount, IProductFormat } from '../../Types/product';

import "../styles/screen-cash-register.scss"
import { useKeyPress } from '../hooks/useKeyPress';
import { useForm } from '../hooks/useForm';
import { ModalChangeAmount } from '../components/modals/ModalChangeAmount';


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
        setTimeout(()=>{setCurrentModal("none")}, 500);
    }
    
    const onClearShoppingCart = () => {setShoppingCart([])};
    
    const deleteProduct = ( barcode: string ) => {
        const newShoppingCart = [...shoppingCart].filter( value => value.barcode !== barcode );
        setShoppingCart( newShoppingCart );
    }

    // MODAL
    const [modal, setModal] = useState<undefined | "change-amount">();
    const onExitModal = () => setModal(undefined);
    const [productShoppingCart, setProductShoppingCart] = useState<undefined | IProductWithAmount>()
    const onModalChangeProduct = (product: IProductWithAmount) => { setModal("change-amount"); setProductShoppingCart(product) }
    const onChangeAmountProduct = (product: IProductWithAmount, newAmount: number) => {
        const existShoppinCartIndex = shoppingCart.findIndex( value => value.barcode === product.barcode );
        let newShoppingCart = [...shoppingCart];
        newShoppingCart[existShoppinCartIndex].amount = newAmount;
        setShoppingCart(newShoppingCart);
        onExitModal()
    }


    // DETECT KEY PRESS
    useKeyPress(
        [/[0-9]/, ( key )=>{ if (modal !== "change-amount") setBarcode(barcode+key) }], // modify barcode
        [/Backspace/, ()=>{ if (modal !== "change-amount") setBarcode("") }] // clean barcode
    )


    //   DETECT PRODUCT BARCODE
    useEffect(() => {
        const lengthBarcode = [13, 8];
        if ( lengthBarcode.includes(barcode.length) ) {

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
                            (product) => <li key={product.barcode} className='product-item'>
                                <p>{`${product.brand} ${product.name} ${product.sizeUnit[0]+product.sizeUnit[1]}`}</p>
                                <p>{product.category}</p>
                                <p className='center'>{`$ `+priceFormat( product.price )}</p>
                                <p style={{cursor: "pointer "}} onClick={()=>onModalChangeProduct(product)} className='center'>{product.amount}</p>
                                <p className='center'>{`$ `+priceFormat( product.amount*product.price )}</p>
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

            {modal === "change-amount" ? <ModalChangeAmount onChangeAmountProduct={onChangeAmountProduct} onExit={onExitModal} product={productShoppingCart}/> : null}
        </div>
    )
}