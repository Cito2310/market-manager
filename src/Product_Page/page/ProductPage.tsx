import { setModalProduct } from "../../store/modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { TopButtons } from "../../components";
import { ModalCreateProduct, ModalDeleteProduct, ModalUpdateProduct, CardProduct } from "../components";

export const ProductPage = () => {
    const { products } = useAppSelector( state => state.product );
    const { current } = useAppSelector( state => state.modal );
    const dispatch = useAppDispatch();

    const onSetModalCreateProduct = () =>  dispatch( setModalProduct( "createProduct" ) );

    return (
        <div className="flex flex-wrap gap-5 p-5">

            <TopButtons
                buttons={[
                    {element: "plus", onClick: onSetModalCreateProduct},
                ]}
            />
            { products.map( product => 
                <CardProduct key={ product.barcode } product={ product } />
            )}

            { current === "createProduct" && <ModalCreateProduct/> }
            { current === "updateProduct" && <ModalUpdateProduct/> }
            { current === "deleteProduct" && <ModalDeleteProduct/> }
        </div>
    )
}