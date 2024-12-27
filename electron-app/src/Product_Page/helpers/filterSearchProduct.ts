import { Product } from "../../../Types";
import { joinTextProduct } from "./joinTextProduct";
import { sortProduct } from "./sortProduct";

export const filterSearchProduct = (products: Product[], searchTerm: string | undefined) => {
    if (searchTerm === undefined) return sortProduct(products);
    
    return sortProduct(products.filter( product => RegExp(searchTerm, "i").test(joinTextProduct(product)) ))
}
    
