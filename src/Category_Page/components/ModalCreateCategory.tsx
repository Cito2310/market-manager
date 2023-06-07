import { useForm } from "react-hook-form"
import { ModalLayout } from "../../layout/ModalLayout"
import { useAppDispatch } from "../../store";
import { exitModal } from "../../store/modal";
import { startCreateCategory } from "../../store/category";


export const ModalCreateCategory = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();

    const onSubmit = async(data: any) => {
        await dispatch( startCreateCategory( data ) );
        onExit()
    }

    const onExit = () => dispatch( exitModal() );

    return (
        <ModalLayout
            title="Crear Categoria"
            onSubmit={handleSubmit( onSubmit )}
            onExit={ onExit }
            buttons={[
                { color:"secondary", label:"Rechazar", func: onExit },
                { color:"primary", label:"Crear", type:"submit" },
            ]}
        >
                <input { ...register("name", { required: true }) }
                    className="rounded px-2 p-1 border mt-1 w-full"
                    placeholder="Nueva categoria"
                />
        </ModalLayout>
    )
}