import { useDetectBarcode } from "../hooks/useDetectBarcode";
import { useKeyUp } from "../../hooks/useKeyUp"
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Sidebar } from "../components/Sidebar";
import { TopItem } from "../components/TopItem";
import { ItemProductCart } from "../components/ItemProductCart";
import { useMemo } from "react";
import { parseNumber } from "../../helpers/parseNumber";
import { setPrint } from "../../store/print/printSlice";
import { resetCart } from "../../store/cashRegister/cashRegisterSlice";
import { ModalNotFoundProduct } from "../components/ModalNotFoundProduct";
import { ModalResetCart } from "../components/ModalResetCart";
import { exitModal, setModalCashRegister } from "../../store/modal/modalSlice";


export const CashRegisterPage = () => {
    const dispatch = useAppDispatch();
    const currentModal = useAppSelector( state => state.modal.current )
    const onExitModal = () => { dispatch( exitModal() ) };

    const currentKeypress = useKeyUp();

    const { products } = useAppSelector( state => state.product );
    const { productsCart } = useAppSelector( state => state.cashRegister );
    const { barcode } = useDetectBarcode( currentKeypress, products );

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