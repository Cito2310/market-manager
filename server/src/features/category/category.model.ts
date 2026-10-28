// No verificado por humano
import { Schema, model } from "mongoose";
import { Brand, Category, SECTIONS, Subcategory } from "../../../../shared/category.schema.js";
import { ToMongo } from "../../types/toMongo.js";

type CategoryMongo = ToMongo<Category>;

const brandSchema = new Schema<Brand>({
    name: { type: String, required: true, trim: true, lowercase: true }
});

const subcategorySchema = new Schema<Subcategory>({
    name: { type: String, required: true, trim: true, lowercase: true },
    brands: { type: [brandSchema], default: [] }
});

const categorySchema = new Schema<CategoryMongo>(
    {
        section: { type: String, enum: SECTIONS, required: true, trim: true, lowercase: true },
        name: { type: String, required: true, trim: true, lowercase: true },
        subcategories: { type: [subcategorySchema], default: [] },
        active: { type: Boolean, default: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true, optimisticConcurrency: true }
);

export const CategoryModel = model<CategoryMongo>("Category", categorySchema);
