import { Product } from "../../Types";

export const parseNameProduct = (product: Product): string => {
    const { brand, name, size, typeSize, subCategory, type } = product;

    const nameBase = `${brand} ${name}`;
    const sizeParse = ( type === "weight" ) ?  ""  :  size+typeSize;

    return `${nameBase} ${sizeParse}`;
}