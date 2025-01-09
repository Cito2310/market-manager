import { UseFormRegisterReturn } from "react-hook-form";
import { ButtonSvg, Svg } from "../../components"

interface props {
    onCreateCategory: () => void;
    onSearch: () => void;
    registerReturn: UseFormRegisterReturn<"search">;
}

export const TopButtonCategory = ({ onCreateCategory, registerReturn, onSearch }: props) => {
    return (
        <div className="
            fixed right-0 top-0
            bg-white p-2 rounded-bl
            flex gap-2 shadow-md
        ">
            <ButtonSvg className="bg-card_btn text-card_btnText w-8" element="plus" onClick={onCreateCategory}/>

            <div className="flex w-[300px]">
                <input {...registerReturn} placeholder="Buscar" className="focus:outline-none border px-2 py-0.5 rounded-bl rounded-tl w-full" />
                <button 
                    onClick={onSearch} 
                    className="
                        text-card_btnText bg-card_btn 
                        rounded-br rounded-tr 
                        aspect-square h-full 
                        flex items-center justify-center 
                        transition-base hover:brightness-[.90] active:brightness-[.80]
                    "
                ><Svg element="search" /></button>
            </div>
        </div >
    )
}