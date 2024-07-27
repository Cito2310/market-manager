import { Product, ProductInType } from "../../../Types";

export const getProductInType = (products: Product[]) => 
    products
        .reduce((prev, curr): ProductInType[]=>{
            let copyPrev = structuredClone(prev);
            const existType = copyPrev.find(v => v.name === curr.majorCategory)
            const existIndex = copyPrev.findIndex(v => v.name === curr.majorCategory)

            if (existType) { copyPrev[existIndex].products.push(curr) }
            if (!existType) { copyPrev.push({ name: curr.majorCategory, products: [ curr ] }) }

            return copyPrev;
        }, [] as ProductInType[] )