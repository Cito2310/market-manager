import { useState } from 'react';
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { useAppDispatch } from "../../store";
import { startDeleteCategoryById, startUpdateCategoryById } from "../../store/category";

import { Button } from "../../components";
import { CardSubcategories, CardCategoryTop } from "./";

import { categoryToFormCategory } from "../../helpers";

import { Category, FormCategory } from "../../../Types";





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

    const onRemoveCategory = async() => { await dispatch( startDeleteCategoryById( category._id ) )}
    const onAppendSubcategory = () => append({ brands: [], name: "" }); 


    return (
        <FormProvider {...methods}>
            <form 
                className="bg-card_bg rounded-md p-3 shadow-md min-w-[300px] min-h-[206px] flex flex-col flex-1 gap-3 justify-between" 
                onSubmit={handleSubmit( onSubmit )} 
            >
                <div className='flex flex-col gap-1'>
                    <CardCategoryTop 
                        category={ category } 
                        isEditing={ isEditing } 
                        toggleEditing={ toggleEditing }
                        onRemoveCategory={ onRemoveCategory }
                        onAppendSubcategory={ onAppendSubcategory }
                    />


                    <div className="flex flex-wrap gap-3">
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