import { Product } from "../../../Types";

// FUNCION
// Recibe todos los productos y los ordena
// Ordena primero por categoria -> subcategoria -> marca -> nombre
export const sortProduct = (products: Product[]) => {
    let copyProducts = structuredClone(products)

    copyProducts.sort((a,b)=>{
        if (a.category > b.category) return 1;
        if (a.category < b.category) return -1;
        
        if (a.subCategory > b.subCategory) return 1;
        if (a.subCategory < b.subCategory) return -1;
        
        if (a.brand > b.brand) return 1;
        if (a.brand < b.brand) return -1;

        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;

        return 0;
    })

    return copyProducts
}