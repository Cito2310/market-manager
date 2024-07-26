import { useMemo } from "react";

import { useAppDispatch, useAppSelector } from "../store/";
import { setPrint } from "../store/print";
import { resetCart } from "../store/cashRegister";
import { exitModal, setModalCashRegister } from "../store/modal";

import { Sidebar, TopItem, ItemProductCart, ModalNotFoundProduct, ModalResetCart } from "./components";
import { useDetectBarcode, useKeyUp } from "../hooks";
import { parseNumber } from "../helpers";


export const CashRegisterPage = () => {
    const dispatch = useAppDispatch();
    const currentModal = useAppSelector( state => state.modal.current )
    const onExitModal = () => { dispatch( exitModal() ) };

    const currentKeypress = useKeyUp();

    const { productsCart } = useAppSelector( state => state.cashRegister );
    const { barcode } = useDetectBarcode( currentKeypress );

    const totalSum = useMemo( () => productsCart.reduce((prev, curr) => prev + curr.price * curr.amount, 0), [ productsCart ] )

    const onResetCart = () => { dispatch( resetCart() ); onExitModal() };
    const onModalReset = () => { dispatch( setModalCashRegister("resetCart") ) };
    const onPrint = () => { 
        dispatch( setPrint( productsCart )); 
        dispatch( resetCart() );
    };

    return (
        <>
            <section className="grid grid-cols-[1fr_300px] w-screen h-full bg-white">
                <div className="flex flex-col justify-between">
                    <div>
                        <TopItem />

                        <ul>
                            { productsCart.map(( productCart, index ) => 
                                <ItemProductCart key={ productCart.barcode } productCart={ productCart } index={ index }/>
                            )}
                        </ul>
                    </div>


                    <div className="bg-white justify-end flex border-t border-gray-500 p-1 px-3">
                        <p className="text-4xl font-semibold">$ { parseNumber( totalSum ) }</p>
                    </div>
                </div>

                <Sidebar 
                    onPrint={ onPrint }
                    onReset={ onModalReset }
                    barcode={ barcode }
                />
            </section>

            { currentModal === "resetCart" && <ModalResetCart onExit={ onExitModal } onResetCart={ onResetCart } /> }
            { currentModal === "notFoundProduct" && <ModalNotFoundProduct /> }
        </>
    )
}