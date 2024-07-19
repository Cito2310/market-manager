import { CustomValidator } from "express-validator";
import { Product } from "../apis/product/productModels";

// P R O D U C T
export const typeValid: CustomValidator = async ( sizeUnit: string ) => {
    const validTypes = ["weight", "unit"];
    if ( !validTypes.includes( sizeUnit ) ) throw new Error;

    return true
}


export const unitSizeValid: CustomValidator = async ( sizeUnit: string ) => {
    const validUnits = ["kg", "g", "oz", "cm3", "l", "ml", "u", "cc"];
    if ( !validUnits.includes( sizeUnit ) ) throw new Error;

    return true
}


export const uniqueBarcode: CustomValidator = async ( barcode: string ) => {
    const product = await Product.findOne({ barcode });

    if (product) throw new Error;

    return true;
}