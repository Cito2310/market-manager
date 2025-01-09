import { setModalCategory } from "../store/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

import { CardCategory } from "./components/CardCategory";
import { ModalCreateCategory } from "./components/ModalCreateCategory";
import { getCategoryInType } from "./helpers/getCategoryInType";
import { TopButtonCategory } from "./components/TopButtonCategory";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { filterSearchCategory } from "./helpers/filterSearchCategory";
import { Category } from "../../Types";


export const CategoryPage = () => {
    const { register, getValues } = useForm();
    const { data: categories } = useAppSelector( state => state.category );
    const { current } = useAppSelector( state => state.modal );
    const dispatch = useAppDispatch()

    const onSetModalCreateCategory = () => dispatch( setModalCategory( "createCategory" ) )
    
    const [categoryFiltered, setCategoryFiltered] = useState<Category[]>([]);

    const filterCategories = () => {
        const searchValue = getValues().search;
        setCategoryFiltered(filterSearchCategory(categories, searchValue));
    };

    useEffect(filterCategories,[ categories ]);


    return (
        <div className="">
            { current === "createCategory" && <ModalCreateCategory /> }

            <TopButtonCategory
                onCreateCategory={onSetModalCreateCategory}
                onSearch={filterCategories}
                registerReturn={register("search")}
            />

            { getCategoryInType( categories ).map( majorCategory => 
                <section key={majorCategory.name} className="p-5">
                    <h2 className="uppercase font-Montserrat font-bold text-[1.8em] ml-1" >{majorCategory.name}</h2>
                    <div className="flex flex-col flex-wrap gap-5">
                        {
                            categoryFiltered.map( category =>
                                <CardCategory key={ category._id }  category={category}/>
                        )}
                    </div>
                </section>
            )}
        </div>
    )
}