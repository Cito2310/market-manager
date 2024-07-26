import { FormProvider } from "react-hook-form";

import { Button } from "../../components";
import { CardCategoryTop } from './CardCategoryTop';
import { CardSubcategories } from './CardSubcategories';


import { Category } from "../../../Types";
import { useCardCategory } from '../hooks/useCardCategory';





interface props {
    category: Category;
}




export const CardCategory = ({ category }: props) => {
    const { handleSubmit, methods, onSubmit, isEditing, toggleEditing, onAppendSubcategory, onRemoveCategory, remove, fields } = useCardCategory( category );


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