import { useDetectBarcode } from "../hooks/useDetectBarcode";
import { useKeyUp } from "../../hooks/useKeyUp"
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Sidebar } from "../components/Sidebar";
import { TopItem } from "../components/TopItem";
import { ItemProductCart } from "../components/ItemProductCart";
import { useMemo } from "react";
import { parseNumber } from "../../helpers/parseNumber";
import { setPrint } from "../../store/print/printSlice";

export const CashRegisterPage = () => {
    const dispatch = useAppDispatch();

    const currentKeypress = useKeyUp();

    const { products } = useAppSelector( state => state.product );
    const { productsCart } = useAppSelector( state => state.cashRegister );
    const { barcode } = useDetectBarcode( currentKeypress, products );

    const totalSum = useMemo( () => productsCart.reduce((prev, curr) => prev + curr.price * curr.amount, 0), [ productsCart ] )

    const onReset = () => {} // TODO
    const onPrint = () => { dispatch( setPrint( productsCart ) ) }

    return (
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
                onReset={ onReset }
                barcode={ barcode }
            />
        </section>
    )
}