import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { v4 as uuidv4 } from 'uuid';
import { startPrintTicket } from "../store/print/thunks";
import { parseNumber } from "../helpers/parseNumber";
import { Ticket } from "../../Types/ticket";
import { getTime } from "../helpers/getTime";

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
                    productsToPrint.map(({ subcategory, brand, name, sizeUnit, price, amount, size, type }, index) => 
                        <li key={index} className='product-item'>
                            <p className="capitalize">{`${subcategory} ${brand} ${name} ${size}${sizeUnit}`}</p>
                            <p className='text-center'>{ type === "weight" ? amount+"Kg" : amount}</p>
                            <p className='text-center'>$ { parseNumber( price * amount ) }</p>
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