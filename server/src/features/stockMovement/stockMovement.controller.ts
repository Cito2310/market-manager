import { Request, Response } from "express";
import { HttpError } from "../../middlewares/errors/HttpError.js";
import { StockMovementModel } from "./stockMovement.model.js";
import { ProductModel } from "../product/product.model.js";
import { StockMovementInput, StockMovementQuery } from "../../../../shared/stockMovement.schema.js";
import { Types } from "mongoose";
import { getDateRange } from "./getDateRange.js";

export const getStockMovements = async (req: Request, res: Response) => {
    const { from, to, productId } = req.query as StockMovementQuery;

    const filter = { createdAt: getDateRange(from, to), ...(productId && { productId: { $in: productId } }) };

    const stockMovements = await StockMovementModel.find(filter).sort({ createdAt: -1 });
    res.status(200).json(stockMovements);
};

export const createStockMovement = async (req: Request, res: Response) => {
    const stockMovementInput = req.body as StockMovementInput;
    const userId = req.user._id;

    const roundQuantity = (value: number) => Math.round(value * 1000) / 1000;

    const product = await ProductModel.findById(stockMovementInput.productId);
    if (!product) throw new HttpError(404, "Product not found");

    if (
        stockMovementInput.type === "return" ||
        stockMovementInput.type === "adjustment" ||
        stockMovementInput.type === "shrinkage"
    ) {
        const indexBatch = product.inventory.batches.findIndex(
            (batch) => String(batch._id) === stockMovementInput.batchId
        );
        if (indexBatch === -1) throw new HttpError(404, "Batch not found");

        const currentQuantity = product.inventory.batches[indexBatch].quantity;
        product.inventory.batches[indexBatch].quantity = roundQuantity(currentQuantity + stockMovementInput.quantity);
    }

    if (stockMovementInput.type === "purchase") {
        product.inventory.batches.push({
            _id: new Types.ObjectId().toString(),
            quantity: stockMovementInput.quantity,
            expirationDate: stockMovementInput.expirationDate,
            receivedAt: new Date()
        });
    }

    if (stockMovementInput.type === "sale") {
        const quantityToSell = -stockMovementInput.quantity;

        const sortedBatches = [...product.inventory.batches].sort(
            (a, b) =>
                (a.expirationDate?.getTime() ?? Infinity) - (b.expirationDate?.getTime() ?? Infinity) ||
                a.receivedAt.getTime() - b.receivedAt.getTime()
        );

        let remaining = quantityToSell;

        for (const batch of sortedBatches) {
            if (remaining === 0) break;
            if (batch.quantity <= 0) continue;

            const taken = Math.min(batch.quantity, remaining);
            batch.quantity = roundQuantity(batch.quantity - taken);
            remaining = roundQuantity(remaining - taken);
        }
    }

    await product.save();
    const newStockMovement = await StockMovementModel.create({ ...stockMovementInput, createdBy: userId });

    res.status(201).json(newStockMovement);
};
