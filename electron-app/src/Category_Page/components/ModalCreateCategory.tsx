import { ModalLayout } from "../../layout/ModalLayout"
import { InputSelect, InputText } from "../../components";
import { useCreateCategory } from "../hooks/useCreateCategory";


export const ModalCreateCategory = () => {
    const { handleSubmit, onExit, onSubmit, register } = useCreateCategory();

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