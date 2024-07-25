import { useForm } from "react-hook-form"
import { ModalLayout } from "../../layout/ModalLayout"
import { useAppDispatch } from "../../store";
import { exitModal } from "../../store/modal";
import { startCreateCategory } from "../../store/category";
import { InputSelect, InputText } from "../../components";


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
            <div className="flex flex-col gap-2">
                <InputText
                    label="Nombre"
                    register={register("name", { required: true })}
                    placeholder="Nueva categoria"
                />


                <InputSelect 
                    label="Categoria Principal"
                    register={register("type", { required: true })}
                    options={["almacen", "limpieza", "perfumeria", "lacteos", "bebidas", "congelados", "bazar", "polleria", "fiambreria"]}
                    className="capitalize"
                />
            </div>
        </ModalLayout>
    )
}