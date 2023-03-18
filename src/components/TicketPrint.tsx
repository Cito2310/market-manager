import { useContext, useEffect } from 'react';
import { priceFormat } from '../helpers/priceFormat';
import { ContextPrint } from '../providers/Print/ProviderPrint';
import "../styles/ticket-print.scss"

export const TicketPrint = () => {
    const { productToPrint, setScreenPrint } = useContext(ContextPrint);

    useEffect(() => {
        const printFuncPage = async() => {
            await window.electronAPI.printPage();
            setTimeout( ()=>{setScreenPrint(false)}, 1000 )
        }
        printFuncPage()
    }, [])

    const getTime = () => {
        const date = new Date();
        const dateComplete =    ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + date.getFullYear();
        const hourComplete =    ('0' + date.getHours()).slice(-2) + ':' + ('0' + (date.getMinutes())).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
        return `${dateComplete} ${hourComplete}`;
    }
    

    return (
        <div className='ticket-print'>
            <div className='column'>
                <h1 className='center'>MERCADITO ALE</h1>
                <p>Mz44 Pc4 444Vv Fontana Chaco</p>
                <p>Fecha de emision: {getTime()}</p>
                <p>ID Ticket: {new Date().getTime().toString().slice(0,12)}</p>
            </div>

            <ul>
                <li className='product-item top'>
                    <p className='center'>PRODUCTO</p>
                    <p className='center'>CANTIDAD</p>
                    <p className='center'>PRECIO</p>
                </li>

                {
                    productToPrint.map(({ brand, name, sizeUnit, price, amount }, index) => <li key={index+"product"} className='product-item'>
                        <p>{`${brand} ${name} ${sizeUnit[0]+sizeUnit[1]}`}</p>
                        <p className='center'>{amount}</p>
                        <p className='center'>$ {priceFormat( price*amount )}</p>
                    </li>)
                }
            </ul>

            <p className='txt-total'>TOTAL : $ { priceFormat(productToPrint.reduce((prev, curr) => prev + curr.price*curr.amount,0)) }</p>
        </div>
    )
}