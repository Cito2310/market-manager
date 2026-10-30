// No verificado por humano
import { Schema, Types, model } from "mongoose";
import { STOCK_MOVEMENT_TYPES, StockMovement } from "../../../../shared/stockMovement.schema.js";

type StockMovementMongo = Omit<StockMovement, "_id" | "productId" | "createdBy"> & {
    productId: Types.ObjectId;
    createdBy: Types.ObjectId;
};

const stockMovementSchema = new Schema<StockMovementMongo>(
    {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        type: { type: String, enum: STOCK_MOVEMENT_TYPES, required: true },
        quantity: { type: Number, required: true },
        note: { type: String, trim: true },
        occurredAt: { type: Date, required: true, default: Date.now },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

stockMovementSchema.index({ productId: 1, occurredAt: -1 });

export const StockMovementModel = model<StockMovementMongo>("StockMovement", stockMovementSchema);
