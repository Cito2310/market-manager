import { model, Schema } from "mongoose";
import { IProductMongo } from "../../types/Product";


const productSchema = new Schema<IProductMongo>({
    brand: { type: String, required: true, lowercase: true },
    category: { type: String, required: true, lowercase: true },
    subCategory: { type: String, required: true, lowercase: true },
    majorCategory: { type: String, required: true, lowercase: true },

    barcode: { type: String, required: true, lowercase: true },
    name: { type: String, required: true, lowercase: true },
    price: { type: Number, required: true },
    type: { type: String, required: true, enum: ["weight", "unit"], lowercase: true },

    size: { type: Number, required: true },
    typeSize: { type: String, required: true, enum: ["kg", "g", "oz", "cm3", "l", "ml", "u", "cc"] }
})

productSchema.methods.toJSON = function() {
    const {__v, ...rest } = this.toObject();
    return rest;
}

export const Product = model("Product", productSchema);