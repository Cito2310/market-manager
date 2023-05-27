import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form"
import { Category } from "../../../Types/category";
import { CategoryCardForm } from "./CategoryCardForm";
import { CategoryCardText } from "./CategoryCardText";
import { useAppDispatch } from "../../store/store";
import { startDeleteCategoryById, startUpdateCategoryById } from "../../store/category/thunks";

export interface FormCategory {
    category: string,
    brands: { brand: string }[]
}

interface props {
    category: Category;
}

export const CategoryCard = ({ category }: props) => {
    const dispatch = useAppDispatch();

    const initialFormValue: FormCategory = {
        category: category.category,
        brands: category.brands.map( brand => ({ brand }) )
    }

    const { control, register, handleSubmit, reset } = useForm<FormCategory>({defaultValues: initialFormValue});
    const { append, fields, remove } = useFieldArray({ control, name: "brands" } );
    const [isBeingEdited, setIsBeingEdited] = useState(false);

    const onAppendBrand = () => append({ brand: "" });
    const toggleEdited = () => {  setIsBeingEdited( !isBeingEdited ); reset(initialFormValue)  };
    
    const onUpdateCategory = async( data: FormCategory ) => {
        await dispatch(startUpdateCategoryById( category._id, data ));
        toggleEdited();
    };

    const onRemoveCategory = async() => {
        await dispatch( startDeleteCategoryById( category._id ) );
    }


    return (
        <div className="bg-card_bg rounded-md p-3 shadow-md min-w-[300px] flex flex-col flex-1">
            {
                isBeingEdited 

                ? <CategoryCardForm
                    onSubmit={ handleSubmit(onUpdateCategory) }
                    fields={ fields }
                    register={ register }
                    remove={ remove }
                    onAppend={ onAppendBrand }
                    toggleEdited={ toggleEdited }
                />

                : <CategoryCardText 
                    onRemove={ onRemoveCategory } 
                    category={ category } 
                    toggleEdited={ toggleEdited }
                />
            }
        </div>
    )
}