import { ModalLayout } from "../../layout/ModalLayout";
import { exitModal } from "../../store/modal/modalSlice";
import { startDeleteProductByBarcode } from "../../store/product/thunks";
import { useAppDispatch, useAppSelector } from "../../store/store"

export const ModalDeleteProduct = () => {
    const dispatch = useAppDispatch();
    const { selectedProduct } = useAppSelector( state => state.modal );
    const onExit = () => { dispatch( exitModal() ) };

    const onDeleteProduct = async( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        await dispatch( startDeleteProductByBarcode( selectedProduct!.barcode ) );
        onExit();
    }

    return (
        <ModalLayout
            title="Eliminar Producto"
            onExit={ onExit }
            onSubmit={ onDeleteProduct }
            buttons={[
                { color: "secondary", label: "Rechazar", func: onExit },
                { color: "danger", type: "submit", label: "Eliminar" },
            ]}
        >
            <p>Seguro que deseas borrar este producto?</p>
        </ModalLayout>
    )
}