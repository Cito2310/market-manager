import { Category } from "../../../Types";

// FUNCION
// Recibe todas las categorias y las ordena
// Ordena solamente por nombre de la categoria
export const sortCategory = (categories: Category[]) => {
    let copyCategories = structuredClone(categories);

    copyCategories.sort((a,b)=>{
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;

        return 0;
    })

    return copyCategories;
}