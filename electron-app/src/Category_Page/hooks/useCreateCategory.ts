import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store";
import { startCreateCategory } from "../../store/category";
import { exitModal } from "../../store/modal";

export const useCreateCategory = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();

    const onSubmit = async(data: any) => {
        await dispatch( startCreateCategory( data ) );
        onExit()
    }

    const onExit = () => dispatch( exitModal() );

    return {
        onExit,
        register,
        handleSubmit,
        onSubmit
    }
}