// No verificado por humano
import { Schema, model } from "mongoose";
import { Batch, Product, SIZE_UNITS } from "../../../../shared/product.schema.js";
import { ToMongo } from "../../types/toMongo.js";

type ProductMongo = ToMongo<Product>;

const batchSchema = new Schema<Batch>({
    quantity: { type: Number, required: true },
    expirationDate: { type: Date },
    receivedAt: { type: Date, default: Date.now }
});

const productSchema = new Schema<ProductMongo>(
    {
        details: {
            name: { type: String, required: true, trim: true, lowercase: true },
            brandId: { type: Schema.Types.ObjectId, required: true },
            categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
            subcategoryId: { type: Schema.Types.ObjectId, required: true },
            barcodes: { type: [{ type: String, trim: true }], default: [] },
            size: { type: Number, required: true },
            sizeUnit: { type: String, enum: SIZE_UNITS, required: true }
        },
        sell: {
            cost: { type: Number, required: true },
            salePrice: { type: Number, required: true },
            weighable: { type: Boolean, default: false }
        },
        inventory: {
            batches: { type: [batchSchema], default: [] },
            alerts: {
                enabled: { type: Boolean, default: false },
                warning: { type: Number, default: 0 },
                low: { type: Number, default: 0 },
                critical: { type: Number, default: 0 }
            }
        },
        active: { type: Boolean, default: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true, optimisticConcurrency: true }
);

export const ProductModel = model<ProductMongo>("Product", productSchema);
