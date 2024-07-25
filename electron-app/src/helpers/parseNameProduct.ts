import { Product } from "../../Types";

export const parseNameProduct = (product: Product): string => {
    const { brand, name, size, sizeUnit, subcategory, type } = product;

    const nameBase = `${subcategory} ${brand} ${name}`;
    const sizeParse = ( type === "weight" ) ?  ""  :  size+sizeUnit;

    return `${nameBase} ${sizeParse}`;
}