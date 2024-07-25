import { FormCategory, Category } from '../../Types';

export const categoryToFormCategory = ( category: Category ): FormCategory => {
    return {
        name: category.name,
        subcategories: category.subcategories.map( subcategory => ({
            name: subcategory.name,
            brands: subcategory.brands.map( brand => ({ name: brand }))
        }))
    }
} 


export const formCategoryToCategory = ( formCategory: FormCategory ): Category => {
    return {
        name: formCategory.name,
        subcategories: formCategory.subcategories.map( subcategory => ({
            name: subcategory.name,
            brands: subcategory.brands.map( brand => brand.name )
        })),
        _id: ""
    }
} 