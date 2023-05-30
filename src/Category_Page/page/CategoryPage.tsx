import { CardCategory } from "../components/CardCategory"
import { Category } from "../../../Types/category"

interface props {
    categories: Category[]
}

export const CategoryPage = ({ categories }: props) => (
    <div className="flex flex-wrap gap-5 p-5">
        { categories.map( category => 
            <CardCategory key={ category._id }  category={category}/>
        )}
    </div>
)