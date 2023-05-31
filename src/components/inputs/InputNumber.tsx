import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form"

interface props {
    register: UseFormRegisterReturn<any> | UseFormRegister<any>;
    label?: string;
    placeholder?: string;
    className?: string;
    length?: [number, number]
}

export const InputNumber = ({ register, label, placeholder, className, length }: props) => (
    <div className="flex flex-col">

        { label && <label className="font-medium ml-1 mb-0.5">{ label }</label> }

        <input type="number" {...register} 
            placeholder={ placeholder }
            min={ length?.[0] }
            max={ length?.[1] }
            className={`border rounded p-1.5 px-3 border-[#eeeeee] shadow-sm focus:outline-none ${className}`}
        />
        
    </div>
)