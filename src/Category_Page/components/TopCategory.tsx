import { useFormContext } from "react-hook-form"
import { ButtonSvg } from "../../components/ButtonSvg"
import { Category } from "../../../Types/category"

interface props {
    category: Category;
    isEditing: boolean;
    toggleEditing: () => void;
    onRemoveCategory: () => void;
    onAppendSubcategory: () => void;
}

export const TopCategory = ({ category, isEditing, toggleEditing, onRemoveCategory, onAppendSubcategory }: props) => {
    const { register } = useFormContext()


    if ( isEditing ) return (
        <div className="flex items-center justify-between gap-3 text-black">
            <input {...register(`name`)}
                className="uppercase text-2xl font-semibold font-Montserrat ml-1 w-full focus:outline-none"
            /> 

            <div className="flex gap-2">
                <ButtonSvg element="trash" onClick={ onRemoveCategory }
                    className="w-8 text-lg bg-card_bg text-card_btnText"
                />

                <ButtonSvg element="plus" onClick={ onAppendSubcategory }
                    className="w-8 text-lg bg-card_bg text-card_btnText"
                />
            </div>
        </div>
    )


    return (
        <div className="flex items-center justify-between gap-3 text-black">
            <h2 className="uppercase text-2xl font-semibold font-Montserrat ml-1">{ category.name }</h2>

            <div>
                <ButtonSvg element="pen" onClick={ toggleEditing }
                    className="w-8 text-lg bg-card_bg text-card_btnText"
                />
            </div>
        </div>
    )
}