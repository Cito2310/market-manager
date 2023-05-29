export interface FormCategory {
    name: string;
    subcategories: {
        name: string;
        brands: { name: string }[]
    }[]
}