import { CardCategory } from "../components/CardCategory"
import { Category } from "../../../Types/category"
import { TopButtons } from "../../components/TopButtons"
import { ModalCreateCategory } from "../components/ModalCreateCategory"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { setModal } from "../../store/modal/modalSlice"

interface props {
    categories: Category[]
}

export const CategoryPage = ({ categories }: props) => {
    const { current } = useAppSelector( state => state.modal );
    const dispatch = useAppDispatch()

    const onSetModalCreateCategory = () => dispatch( setModal( "createCategory" ) )
    const onSetModalSearchCategory = () => dispatch( setModal( "searchCategory" ) )
    
    
    return (
        <div className="flex flex-wrap gap-5 p-5">
            { current === "createCategory" && <ModalCreateCategory /> }

            <TopButtons
                buttons={[
                    {element: "search", onClick: onSetModalSearchCategory},
                    {element: "plus", onClick: onSetModalCreateCategory},
                ]}
            />
            { categories.map( category => 
                <CardCategory key={ category._id }  category={category}/>
            )}
        </div>
    )
}