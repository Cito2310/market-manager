import { Category } from "../../../Types/category"
import { CardCategory } from "../components/CardCategory"

interface props {
    categories: Category[]
}

export const CategoryPage = ({ categories }: props) => {
    return (
        <>
            <section className="flex flex-wrap gap-5 p-5">
                { categories.map( category => 
                    <CardCategory key={ category._id }  category={category}/>
                )}
            </section>
        </>
    )
}