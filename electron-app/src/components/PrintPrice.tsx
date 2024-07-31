import { useEffect, useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from "../store";
import { startPrintTicket } from "../store/print";

import { parseNumber, getTime, parseNameProduct } from "../helpers";

import { Ticket } from "../../Types";

import "../styles/TicketPrint.scss"
import { startPrintPrice } from "../store/printPrice";

export const PrintPrice = () => {
    const dispatch = useAppDispatch()

    const { productsToPrint } = useAppSelector( state => state.printPrice );
    
    useEffect(() => { 
        dispatch( startPrintPrice() ) 
    }, []);
    
    const formatNumber = (num: number) =>  {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    return (
        <div className='bg-white text-center break-words fixed z-50 ticket-print w-[175px]'>
            <h2 className="font-bold text-center text-[24px]" >$ {formatNumber(productsToPrint!.price)}</h2>
            <h2 className="capitalize text-[8px]">{productsToPrint?.brand} {productsToPrint?.name} {productsToPrint?.size}{productsToPrint?.typeSize}</h2>
        </div>
    )
}