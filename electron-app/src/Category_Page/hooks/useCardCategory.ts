import { useFieldArray, useForm } from "react-hook-form";
import { useAppDispatch } from "../../store";
import { Category, FormCategory } from "../../../Types";
import { categoryToFormCategory } from "../../helpers";
import { useState } from "react";
import { startDeleteCategoryById, startUpdateCategoryById } from "../../store/category";

export const useCardCategory = ( category: Category ) => {
    const dispatch = useAppDispatch()

    const methods = useForm<FormCategory>({ defaultValues: categoryToFormCategory( category ) });
    const { control, handleSubmit, reset } = methods;
    const { append, fields, remove } = useFieldArray({ control, name: "subcategories" });

    const [isEditing, setIsEditing] = useState(false);
    const toggleEditing = () => {
        setIsEditing(!isEditing); 
        reset(categoryToFormCategory( category ));
    };

    const onSubmit = async( data: FormCategory ) => { 
        await dispatch( startUpdateCategoryById( category._id, data ) );
        setIsEditing( false ); 
    };

    const onRemoveCategory = async() => { await dispatch( startDeleteCategoryById( category._id ) )}
    const onAppendSubcategory = () => append({ brands: [], name: "" }); 


    return { methods, handleSubmit, onSubmit, isEditing, toggleEditing, onRemoveCategory, onAppendSubcategory, remove, fields }
}