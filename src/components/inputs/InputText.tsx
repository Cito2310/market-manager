import { UseFormRegister } from "react-hook-form"

interface props {
    register: UseFormRegister<any>;
    label?: string;
    placeholder?: string;
}

export const InputText = ({ register, label, placeholder }: props) => (
    <div className="flex flex-col">

        { label && <label className="font-medium ml-1 mb-0.5">{ label }</label> }

        <input {...register} 
            placeholder={ placeholder }
            className="border rounded p-1.5 px-3 border-[#eeeeee] shadow-sm focus:outline-none"
        />
        
    </div>
)