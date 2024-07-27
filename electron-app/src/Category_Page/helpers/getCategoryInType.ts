import { Category, CategoryInType } from "../../../Types";

export const getCategoryInType = (category: Category[]) => 
    category
        .reduce((prev, curr): CategoryInType[]=>{
            let copyPrev = structuredClone(prev);
            const existType = copyPrev.find(v => v.name === curr.type)
            const existIndex = copyPrev.findIndex(v => v.name === curr.type)

            if (existType) { copyPrev[existIndex].category.push(curr) }
            if (!existType) { copyPrev.push({ name: curr.type, category: [ curr ] }) }

            return copyPrev;


        }, [] as CategoryInType[] )