import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

interface props {
    register: UseFormRegisterReturn<any> | UseFormRegister<any>;
    label?: string;
    className?: string;
    options: string[];
    emptyField?: boolean;
}

export const InputSelect = ({ register, label, className, options, emptyField }: props) => {
    return (

        <div className="flex flex-col">

            { label && <label className="font-medium ml-1 mb-0.5">{ label }</label> }

            <select { ...register }
                className={`border rounded p-1.5 px-3 border-[#eeeeee] shadow-sm focus:outline-none ${className}`}
            >
                { emptyField && <option></option> }
                {
                    options.map( value => <option value={value} key={value}>{ value }</option>)
                }
            </select>
            
    </div>
    )
}