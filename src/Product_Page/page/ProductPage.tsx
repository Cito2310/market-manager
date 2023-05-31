import { TopButtons } from "../../components/TopButtons";
import { setModal } from "../../store/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { CardProduct } from "../components/CardProduct";
import { ModalCreateProduct } from "../components/ModalCreateProduct";

export const ProductPage = () => {
    const { products } = useAppSelector( state => state.product );
    const { current } = useAppSelector( state => state.modal );
    const dispatch = useAppDispatch();

    const onSetModalCreateProduct = () =>  dispatch( setModal( "createProduct" ) );

    return (
        <div className="flex flex-col flex-wrap gap-5 p-5">

            <TopButtons
                buttons={[
                    {element: "plus", onClick: onSetModalCreateProduct},
                ]}
            />
            { products.map( product => 
                <CardProduct key={ product.barcode } product={ product } />
            )}

            { current === "createProduct" && <ModalCreateProduct/> }
        </div>
    )
}