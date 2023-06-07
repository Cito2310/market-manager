import { UseFieldArrayRemove, UseFormReturn, useFieldArray } from "react-hook-form"
import { ButtonSvg } from "../../components";
import { Category, FormCategory } from "../../../Types";

interface props {
    methods: UseFormReturn<FormCategory, any>;
    index: number;
    removeSubcategory: UseFieldArrayRemove;
    category: Category;
    isEditing: boolean;
}

export const CardSubcategories = ({ methods, index: indexMain, removeSubcategory, category, isEditing }: props) => {
    const { control, register } = methods;
    const { append, remove, fields } = useFieldArray({control, name: `subcategories.${indexMain}.brands`})

    const onAppendBrand = () => append({ name: "" });


    if ( isEditing ) return (
        <section className="p-2 flex-1 border rounded min-w-[300px] text-txt-black">
            <div className="flex flex-col h-32 overflow-auto scrollbar-hide">

                <div className="flex justify-between items-center gap-3 mb-1">
                    <input {...register(`subcategories.${indexMain}.name`)}
                        placeholder="Subcategoria"
                        className="capitalize text-xl font-medium font-Montserrat w-full focus:outline-none border-b"
                    />

                    <div className="flex gap-3">
                        <ButtonSvg 
                            element="plus" 
                            onClick={ onAppendBrand } 
                            className="text-card_btnText text-xl"
                        />

                        <ButtonSvg 
                            element="trash" 
                            onClick={ () => removeSubcategory( indexMain ) } 
                            className="text-card_btnText text"
                        />
                    </div>
                </div>


                { fields.map( (field, index) => (
                    <div className="gap-3 flex" key={field.id}>
                        <input {...register(`subcategories.${indexMain}.brands.${index}.name`)} 
                            className="capitalize focus:outline-none border-b w-full"
                            placeholder="Marca"
                        />
                        <ButtonSvg
                            className="text-card_btnText hover:text-red-500"
                            element="minus"
                            onClick={()=> remove( index ) }
                        />
                    </div>
                ))}

            </div>
        </section>
    )


    
    return (
        <section className="p-2 flex-1 border rounded min-w-[300px] text-txt-black">
            <div className="flex flex-col h-32 overflow-auto scrollbar-hide">

                <div className="flex justify-between items-center gap-3 mb-1">
                    <h3 className="capitalize text-xl font-medium font-Montserrat">{ category.subcategories[indexMain].name }</h3>
                </div>

                { fields.map( (field, index) => (
                    <div className="gap-3 flex" key={field.id}>
                            <p className="capitalize">{ category.subcategories[indexMain].brands[index] }</p>
                    </div>
                ))}

            </div>
        </section>
    )
}