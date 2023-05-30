import { TopButtons } from "../../components/TopButtons";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { CardProduct } from "../components/CardProduct";

export const ProductPage = () => {
    const { products } = useAppSelector( state => state.product );
    const dispatch = useAppDispatch()

    return (
        <div className="flex flex-col flex-wrap gap-5 p-5">

            <TopButtons
                buttons={[
                    // {element: "plus", onClick: onSetModalCreateCategory},
                ]}
            />
            { products.map( product => 
                <CardProduct key={ product.barcode } product={ product } />
            )}
        </div>
    )
}