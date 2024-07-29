import { Product } from "../../../Types"

export const joinTextProduct = ({ barcode, brand, category, majorCategory, name, price, size, subCategory, type, typeSize}: Product) => (
    `${barcode} ${brand} ${category} ${majorCategory} ${name} ${size} ${subCategory} ${type} ${typeSize}`
)