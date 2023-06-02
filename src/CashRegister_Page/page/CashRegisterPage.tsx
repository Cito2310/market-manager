import { useDetectBarcode } from "../hooks/useDetectBarcode";
import { useKeyUp } from "../hooks/useKeyUp"
import { useAppSelector } from "../../store/store";

export const CashRegisterPage = () => {
    const currentKeypress = useKeyUp();

    const { products } = useAppSelector( state => state.product );
    const { productsCart } = useAppSelector( state => state.cashRegister );
    const { barcode } = useDetectBarcode( currentKeypress, products );

    return (
        <section>
            <p>{ products[0] ? "ready" : "loading" } { barcode }</p>

            <ul>
                { productsCart.map( productCart => 
                    <li key={productCart.barcode}>{JSON.stringify( productCart )}</li>
                )}
            </ul>
        </section>
    )
}