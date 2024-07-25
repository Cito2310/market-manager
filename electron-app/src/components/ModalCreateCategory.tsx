import { useForm } from "react-hook-form"
import { ModalLayout } from "../layout/ModalLayout"
import { InputText } from "./inputs/InputText"


export const ModalCreateCategory = () => {
    const { register, handleSubmit } = useForm();
    const onExit = () => { throw new Error("NOT IMPLEMENTED: onExit") }

    return (
        <ModalLayout
            title="Nueva Categoría" 
            buttons={[
                {color: "secondary", label: "Rechazar", func: onExit},
                {color: "primary", label: "Crear ", type: "submit" },
            ]}
            onExit={ onExit }
        >
            <div className="gap-2 flex-col flex my-2 text-gray-700">
         

                <InputText 
                    register={register}
                    placeholder="Nombre de la categoria" 
                />

            </div>
        </ModalLayout>
    )
}