import { Product } from "../../../Types";
import { joinTextProduct } from "./joinTextProduct";
import { sortProduct } from "./sortProduct";

export const filterSearchProduct = (products: Product[], searchTerm: string | undefined) => {
    if (searchTerm === undefined) return sortProduct(products);

    const searchTermSplit = searchTerm.split(/\s+/).map( string => RegExp(string, "i") );
    
    return sortProduct(products.filter( product => 
        searchTermSplit.every( regex => regex.test(joinTextProduct(product)))
    ));
}
    
