import { Category } from "../../../Types/category"
import { CategoryCardButtonSvg } from "./CategoryCardButtonSvg";

interface props {
    category: Category;
    toggleEdited: () => void;
    onRemove: () => void;
}

export const CategoryCardText = ({ category, toggleEdited, onRemove }: props) => {
    const { brands, category: title } = category;

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-xl font-semibold">{ title }</h2>

                <div className="flex gap-2">
                    <CategoryCardButtonSvg element="trash" onClick={()=>{ onRemove }} />

                    <CategoryCardButtonSvg element="pen" onClick={ toggleEdited } />
                </div>
            </div>

            <ul className="flex flex-col h-32 overflow-auto scrollbar-hide my-2">
                { brands.map( brand => <li className="ml-2 capitalize" key={ brand }>{ brand }</li> ) }
            </ul>
        </>
    )
}