import { useContext, useState, useEffect } from 'react';

import { priceFormat } from '../helpers/priceFormat';
import { detectKeyUp } from "../helpers/detectKeyUp";

import { ContextDatabase, ContextPrint, ContextModal } from '../providers';

import { InputText, SvgElements } from '../components/';

import { IProductWithAmount, IProductFormat } from '../../Types/product';

import "../styles/screen-cash-register.scss"


export const ScreenCashRegister = () => {
    const { setCurrentModal } = useContext(ContextModal);
    const { product } = useContext(ContextDatabase);
    const { setProductToPrint, toggleScreenPrint } = useContext( ContextPrint );

    const [barcode, setBarcode] = useState<string>("");
    const [shoppingCart, setShoppingCart] = useState<IProductWithAmount[]>([]);
    const [notFound, setNotFound] = useState(false);

    
    const onPrint = () => {
        setProductToPrint(shoppingCart);
        toggleScreenPrint();
    }
    
    const onToggleNotFoundModal = () => {
        setCurrentModal('not-found');
        setTimeout(()=>{setNotFound(false)}, 800);
        setBarcode("");
    }
    
    const onClearShoppingCart = () => {setShoppingCart([])};
    
    const deleteProduct = ( barcode: string ) => {
        const newShoppingCart = [...shoppingCart].filter( value => value.barcode !== barcode );
        setShoppingCart( newShoppingCart );
    }
    
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
                    onToggleNotFoundModal();
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
                        label='Codigo de barra' 
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