import { setModalCategory } from "../../store/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

import { CardCategory } from "../components/CardCategory";
import { TopButtons } from "../../components/TopButtons";
import { ModalCreateCategory } from "../components/ModalCreateCategory";


export const CategoryPage = () => {
    const { data } = useAppSelector( state => state.category );
    const { current } = useAppSelector( state => state.modal );
    const dispatch = useAppDispatch()

    const onSetModalCreateCategory = () => dispatch( setModalCategory( "createCategory" ) )
    
    return (
        <div className="flex flex-col flex-wrap gap-5 p-5">
            { current === "createCategory" && <ModalCreateCategory /> }

            <TopButtons
                buttons={[
                    {element: "plus", onClick: onSetModalCreateCategory},
                ]}
            />
            { data.map( category => 
                <CardCategory key={ category._id }  category={category}/>
            )}
        </div>
    )
}