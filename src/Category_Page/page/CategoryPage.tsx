import { Category } from "../../../Types/category"
import { Svg } from "../../components/Svg"
import { useAppDispatch } from "../../store/store"
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
                {/* <CategoryCard category={{
                    _id: "1",
                    brands: ["Cabalgata", "Coca Cola", "Sprite", "Fanta", "Pepsi", "Manaos", "Mirinda"],
                    category: "Gaseosas"
                }}/> */}
            </section>
        </>
    )
}