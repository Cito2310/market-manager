import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store";
import { startLogin } from "../../store/auth";
import { ModalLayout } from "../../layout/ModalLayout";
import { InputText } from "../../components";

export const LoginPage = () => {
    const { register, getValues, handleSubmit } = useForm();
    const dispatch = useAppDispatch();

    const submit = () => {
        dispatch( startLogin( getValues("username"), getValues("password") ) )
    }

    return (
        <div className="h-full">
            <ModalLayout
                title="Iniciar Sesion"
                buttons={[{ color:"primary", full: true, label: "Iniciar Sesion", type: "submit" }]}
                onSubmit={ handleSubmit( submit ) }
            >
                <div className="flex flex-col gap-2">
                    <InputText register={register("username")} label="Nombre de Usuario" placeholder="Nombre de Usuario" />
                    <InputText password register={register("password")} label="Contraseña" placeholder="Contraseña" />
                </div>
            </ModalLayout>
        </div>
    )
}