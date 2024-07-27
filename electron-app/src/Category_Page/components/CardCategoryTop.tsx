import { useFormContext } from "react-hook-form"
import { ButtonSvg, InputSelect } from "../../components"
import { Category } from "../../../Types"

interface props {
    category: Category;
    isEditing: boolean;
    toggleEditing: () => void;
    onRemoveCategory: () => void;
    onAppendSubcategory: () => void;
}

export const CardCategoryTop = ({ category, isEditing, toggleEditing, onRemoveCategory, onAppendSubcategory }: props) => {
    const { register } = useFormContext()


    if ( isEditing ) return (
        <div className="flex items-center justify-between text-black">
            <input {...register(`name`)}
                placeholder="Categoria"
                className="uppercase text-2xl font-semibold font-Montserrat ml-1 w-full focus:outline-none"
            /> 

            <InputSelect 
                register={register("type")}
                options={["almacen", "limpieza", "perfumeria", "lacteos", "bebidas", "congelados", "bazar", "polleria", "fiambreria"]}
                className="capitalize"
            />

            <div className="flex gap-2">
                <ButtonSvg element="trash" onClick={ onRemoveCategory } className="w-8 text-lg bg-card_bg text-card_btnText" />
                <ButtonSvg element="plus" onClick={ onAppendSubcategory } className="w-8 text-lg bg-card_bg text-card_btnText" />
            </div>
        </div>
    )


    return (
        <div className="flex items-center justify-between text-black">
            <h1 className="uppercase text-2xl font-semibold font-Montserrat ml-1">{ category.name }</h1>

            <ButtonSvg element="pen" onClick={ toggleEditing } className="w-8 text-lg bg-card_bg text-card_btnText" />
        </div>
    )
}