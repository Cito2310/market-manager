import { Category } from "../../../Types/category"
import { CategoryCard } from "../components/CategoryCard"

interface props {
    categories: Category[]
}

export const CategoryPage = ({ categories }: props) => {
    return (
        <>
            <section className="flex flex-wrap gap-5 p-5">
                { categories.map( category => 
                    <CategoryCard key={ category._id }  category={category}/>
                )}
            </section>
        </>
    )
}