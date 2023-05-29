import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Category } from "../../../Types/category";
import { categoryToFormCategory } from "../../helpers/formCategoryParse";
import { FormCategory } from "../../../Types/formData";
import { CardSubcategories } from "./CardSubcategories";
import { Button } from "../../components/Button";
import { CardCategoryTop } from "./CardCategoryTop";
import { useState } from 'react';
import { useAppDispatch } from "../../store/store";
import { startUpdateCategoryById } from "../../store/category/thunks";


interface props {
    category: Category;
}

export const CardCategory = ({ category }: props) => {
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

    const onRemoveCategory = () => { throw new Error("NOT IMPLEMENTED: onRemoveCategory") };
    const onAppendSubcategory = () => append({ brands: [], name: "" }); 


    return (
        <FormProvider {...methods}>
            <form 
                className="bg-card_bg rounded-md p-3 shadow-md min-w-[300px] flex flex-col flex-1 gap-3" 
                onSubmit={handleSubmit( onSubmit )} 
            >
                <CardCategoryTop 
                    category={ category } 
                    isEditing={ isEditing } 
                    toggleEditing={ toggleEditing }
                    onRemoveCategory={ onRemoveCategory }
                    onAppendSubcategory={ onAppendSubcategory }
                />

                <div className="flex flex-wrap gap-3 -mt-2">
                    { fields.map(( field, index ) => 
                        <CardSubcategories 
                            key={ field.id } 
                            methods={ methods } 
                            index={ index }
                            removeSubcategory={ remove }
                            category={ category }
                            isEditing={ isEditing }
                        /> 
                    )}
                </div>

                {
                    isEditing &&

                    <div className="flex flex-row-reverse gap-3">
                        <Button label="Editar" color="primary" type="submit"/>
                        <Button label="Rechazar" color="secondary" func={ toggleEditing }/>
                    </div>
                }
            </form>
        </FormProvider>
    )
}