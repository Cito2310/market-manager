// No verificado por humano
import { Schema, Types, model } from "mongoose";
import { StockSnapshot } from "../../../../shared/stockSnapshot.schema.js";

type StockSnapshotItemMongo = {
    productId: Types.ObjectId;
    quantity: number;
};

type StockSnapshotMongo = Omit<StockSnapshot, "_id" | "lastMovementId" | "items"> & {
    lastMovementId: Types.ObjectId | null;
    items: StockSnapshotItemMongo[];
};

const stockSnapshotItemSchema = new Schema<StockSnapshotItemMongo>(
    {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true }
    },
    { _id: false }
);

const stockSnapshotSchema = new Schema<StockSnapshotMongo>(
    {
        lastMovementId: { type: Schema.Types.ObjectId, ref: "StockMovement", default: null },
        items: { type: [stockSnapshotItemSchema], required: true }
    },
    { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

stockSnapshotSchema.index({ createdAt: -1 });

export const StockSnapshotModel = model<StockSnapshotMongo>("StockSnapshot", stockSnapshotSchema);
