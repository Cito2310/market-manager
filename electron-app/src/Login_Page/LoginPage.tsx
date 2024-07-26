import { ModalLayout } from "../layout/ModalLayout";
import { InputText } from "../components";
import { useLogin } from "./hooks/useLogin";

export const LoginPage = () => {
    const { handleSubmit, hasError, isLoading, submit, register } = useLogin()

    return (
        <div className="h-full">
            <ModalLayout
                title="Iniciar Sesion"
                buttons={[{ color:"primary", full: true, label: "Iniciar Sesion", type: "submit", disabled: isLoading }]}
                onSubmit={ handleSubmit( submit ) }
                hasError={ hasError }
                msgError="Verifique los datos insertados"
            >
                <div className="flex flex-col gap-2">
                    <InputText register={register("username")} label="Nombre de Usuario" placeholder="Nombre de Usuario" />
                    <InputText password register={register("password")} label="Contraseña" placeholder="Contraseña" />
                </div>
            </ModalLayout>
        </div>
    )
}