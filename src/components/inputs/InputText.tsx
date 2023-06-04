import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form"

interface props {
    register: UseFormRegisterReturn<any> | UseFormRegister<any>;
    label?: string;
    placeholder?: string;
    className?: string;
    password?: boolean
}

export const InputText = ({ register, label, placeholder, className, password }: props) => (
    <div className="flex flex-col">

        { label && <label className="font-medium ml-1 mb-0.5">{ label }</label> }

        <input {...register} 
            placeholder={ placeholder }
            type={ password ? "password" : "text" }
            className={`border rounded p-1.5 px-3 border-[#eeeeee] shadow-sm focus:outline-none ${className}`}
        />
        
    </div>
)