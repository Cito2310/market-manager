import { useState } from "react";

export const useForm = <T>( initialForm: T ) => {
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({target}: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name , value} = target;
        setFormState({
            ...formState,
            [name]: value
    })}

    const onResetForm = () => {
        setFormState(initialForm)
    }
    
    return {
        ...formState,
        formState,
        onResetForm,
        onInputChange,
    }
}