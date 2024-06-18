import { model, Schema } from "mongoose";
import { ICategoryMongo } from "../../types/Category";


const categorySchema = new Schema<ICategoryMongo>({
    name: { type: String, required: true, lowercase: true },
    type: { type: String, required: true, lowercase: true },

    subcategories: {
        type: [{
            name: { type: String, required: true, lowercase: true },
            brands: {
                type: [{ type: String, lowercase: true }],
                default: []
            }
        }],
        default: []
    }
})

categorySchema.methods.toJSON = function() {
    const {__v, ...rest } = this.toObject();
    return rest;
}

export const Category = model("Category", categorySchema);