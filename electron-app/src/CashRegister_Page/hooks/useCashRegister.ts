import { useMemo } from "react";
import { useDetectBarcode, useKeyUp } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../store";
import { exitModal, setModalCashRegister } from "../../store/modal";
import { resetCart } from "../../store/cashRegister";
import { setPrint } from "../../store/print";

export const useCashRegister = () => {
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

    return {
        onPrint,
        onResetCart,
        onModalReset,
        totalSum,
        barcode,
        productsCart,
        currentModal,
        onExitModal
    }
}