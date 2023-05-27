import { UseFormRegister, FieldArrayWithId, UseFieldArrayRemove } from "react-hook-form";
import { FormCategory } from "./CategoryCard";
import { BaseSyntheticEvent } from "react";
import { CategoryCardButtonSvg } from "./CategoryCardButtonSvg";

interface props {
    onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    register: UseFormRegister<FormCategory>
    fields: FieldArrayWithId<FormCategory>[];
    remove: UseFieldArrayRemove;
    onAppend: () => void;
    toggleEdited: () => void;
}

export const CategoryCardForm = ({ onSubmit, register, fields, remove, onAppend, toggleEdited }: props) => {
    return (
        <form onSubmit={ onSubmit } >
            <div className="flex justify-between">
                <input 
                    placeholder="Nueva Categoria"
                    className="focus:outline-none w-full text-xl font-semibold uppercase" 
                    {...register("category")}
                />

                <CategoryCardButtonSvg element="plus" onClick={ onAppend }/>
            </div>

            <ul className="flex flex-col gap-1 my-2 h-32 overflow-auto scrollbar-hide">
                { fields.map( ( field, index ) => (
                    <li className="flex gap-2" key={field.id}>
                        <input 
                            placeholder="Nueva Marca"
                            className="ml-2 focus:outline-none w-full uppercase" 
                            {...register(`brands.${index}.brand`)}
                        />

                        <CategoryCardButtonSvg
                            onClick={ ()=>remove(index) }
                            element="minus"
                            className="text-xl px-1 transition-base text-card_btnText hover:text-danger"
                        />
                    </li>
                )) }
            </ul>

            <div className="flex justify-end gap-2">
                <button className="
                    bg-card_btn text-black rounded-md py-1 px-3 transition-base hover:brightness-75" 
                    type="button"
                    onClick={ toggleEdited }
                >
                    Rechazar
                </button>
                <button className="
                    bg-blue-500 text-card_bg rounded-md py-1 px-3 transition-base hover:brightness-[.80]" 
                    type="submit"
                >
                    Guardar
                </button>
            </div>

        </form>
    )
}