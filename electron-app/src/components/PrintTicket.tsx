import { useEffect, useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from "../store";
import { startPrintTicket } from "../store/print";

import { parseNumber, getTime, parseNameProduct } from "../helpers";

import { Ticket } from "../../Types";

import "../styles/TicketPrint.scss"

export const PrintTicket = () => {
    const dispatch = useAppDispatch()

    const { productsToPrint } = useAppSelector( state => state.print );
    
    const ticketToPrint: Ticket = useMemo(() => ({
        date: getTime(),
        idTicket: uuidv4(),
        products: productsToPrint.map(({ amount, barcode, price }) => ({
            total: price * amount,
            amount,
            barcode,
        }))

    }), [ productsToPrint ])


    useEffect(() => { 
        dispatch( startPrintTicket( ticketToPrint ) ) 
    }, []);
    

    return (
        <div className='bg-white fixed z-50 ticket-print'>
            <div className='column'>
                <h1 className='center'>MERCADITO ALE</h1>
                <p>Mz44 Pc4 444Vv Fontana Chaco</p>
                <p>Fecha de emision: {ticketToPrint.date}</p>
                <p>ID Ticket: {ticketToPrint.idTicket}</p>
            </div>

            <ul>
                <li className='product-item top'>
                    <p className='text-center'>PRODUCTO</p>
                    <p className='text-center'>CANTIDAD</p>
                    <p className='text-center'>PRECIO</p>
                </li>

                {
                    productsToPrint.map((product , index) => 
                        <li key={index} className='product-item'>
                    {/* @ts-ignore */}
                            <p className="capitalize">{ parseNameProduct( product ) }</p>
                            <p className='text-center'>{ product.type === "weight" ? product.amount+"Kg" : product.amount}</p>
                            <p className='text-center'>$ { parseNumber( product.price * product.amount ) }</p>
                        </li>)
                }
            </ul>

            <p className='txt-total'>TOTAL : $ 
                { 
                    parseNumber(productsToPrint.reduce((prev, curr) => prev + curr.price*curr.amount, 0))
                }
            </p>
        </div>
    )
}