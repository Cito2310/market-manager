import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store";
import { startLogin } from "../../store/auth";

export const useLogin = () => {
    const { register, getValues, handleSubmit } = useForm();
    const { hasError, isLoading } = useAppSelector(state => state.auth.status);
    const dispatch = useAppDispatch();

    const submit = () => {
        dispatch( startLogin( getValues("username"), getValues("password") ) )
    }

    return {
        handleSubmit,
        submit,
        hasError,
        isLoading,
        register,
    }
}