import { Category, Product } from "../../../Types";
import { sortCategory } from "./sortCategory";

export const filterSearchCategory = (categories: Category[], searchTerm: string | undefined) => {
    if (searchTerm === undefined) return sortCategory(categories);

    const searchTermSplit = searchTerm.split(/\s+/).map( string => RegExp(string, "i") );

    const joinTextCategory = (category: Category) => {
        const arrSubcategories = category.subcategories.map(subcategory => subcategory.name).join(" ");
        return `${category.name} ${arrSubcategories}`
    }

    return sortCategory(categories.filter( category => 
        searchTermSplit.every( regex => regex.test(joinTextCategory(category)))
    ));
}
    
