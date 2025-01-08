import { setModalCategory } from "../store/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

import { CardCategory } from "./components/CardCategory";
import { ModalCreateCategory } from "./components/ModalCreateCategory";
import { TopButtons } from "../components/TopButtons";
import { getCategoryInType } from "./helpers/getCategoryInType";
import { sortCategory } from "./helpers/sortCategory";


export const CategoryPage = () => {
    const { data } = useAppSelector( state => state.category );
    const { current } = useAppSelector( state => state.modal );
    const dispatch = useAppDispatch()

    const onSetModalCreateCategory = () => dispatch( setModalCategory( "createCategory" ) )
    
    return (
        <div className="">
            { current === "createCategory" && <ModalCreateCategory /> }

            <TopButtons
                buttons={[
                    {element: "plus", onClick: onSetModalCreateCategory},
                ]}
            />
            { getCategoryInType( data ).map( majorCategory => 
                <section key={majorCategory.name} className="p-5">
                    <h2 className="uppercase font-Montserrat font-bold text-[1.8em] ml-1" >{majorCategory.name}</h2>
                    <div className="flex flex-col flex-wrap gap-5">
                        {
                            sortCategory(majorCategory.category).map( category =>
                                <CardCategory key={ category._id }  category={category}/>
                            )
                        }
                    </div>
                </section>
            )}
        </div>
    )
}