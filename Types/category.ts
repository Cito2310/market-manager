export interface Category {
    _id: string;
    name: string;
    subcategories: {
        name: string;
        brands: string[];
    }[];
};