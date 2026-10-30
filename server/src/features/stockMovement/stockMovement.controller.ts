// No verificado por humano
import { Request, Response } from "express";
import { HttpError } from "../../middlewares/errors/HttpError.js";
import { StockMovementModel } from "./stockMovement.model.js";
import { ProductModel } from "../product/product.model.js";
import {
    SaleBatchInput,
    StockMovementDeleteQuery,
    StockMovementInput,
    StockMovementQuery
} from "../../../../shared/stockMovement.schema.js";
import mongoose, { Types } from "mongoose";
import { getDateRange } from "./getDateRange.js";
import { roundQuantity } from "./roundQuantity.js";
import { consumeByExpiration } from "./consumeByExpiration.js";

const DELETE_BATCH_SIZE = 10000;

export const getStockMovements = async (req: Request, res: Response) => {
    const { from, to, productId } = req.query as StockMovementQuery;

    const filter = { createdAt: getDateRange(from, to), ...(productId && { productId: { $in: productId } }) };

    const stockMovements = await StockMovementModel.find(filter).sort({ createdAt: -1 });
    res.status(200).json(stockMovements);
};

export const createStockMovement = async (req: Request, res: Response) => {
    const stockMovementInput = req.body as StockMovementInput;
    const userId = req.user._id;

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
        consumeByExpiration(product.inventory.batches, -stockMovementInput.quantity);
    }

    await product.save();
    const newStockMovement = await StockMovementModel.create({ ...stockMovementInput, createdBy: userId });

    res.status(201).json(newStockMovement);
};

export const createSaleStockMovements = async (req: Request, res: Response) => {
    const saleInputs = req.body as SaleBatchInput;
    const userId = req.user._id;

    const productIds = [...new Set(saleInputs.map(({ productId }) => productId))];

    const newStockMovements = await mongoose.connection.transaction(async (session) => {
        const products = await ProductModel.find({ _id: { $in: productIds } }).session(session);
        if (products.length !== productIds.length) throw new HttpError(404, "Product not found");

        const productsById = new Map(products.map((product) => [String(product._id), product]));

        saleInputs.forEach((saleInput) => {
            const product = productsById.get(saleInput.productId);
            if (product) consumeByExpiration(product.inventory.batches, -saleInput.quantity);
        });

        for (const product of products) {
            await product.save({ session });
        }

        return StockMovementModel.insertMany(
            saleInputs.map((saleInput) => ({ ...saleInput, createdBy: userId })),
            { session }
        );
    });

    res.status(201).json(newStockMovements);
};

export const deleteStockMovements = async (req: Request, res: Response) => {
    const { before } = req.query as unknown as StockMovementDeleteQuery;

    const found = await StockMovementModel.find({ createdAt: { $lt: before } })
        .sort({ createdAt: 1 })
        .limit(DELETE_BATCH_SIZE + 1)
        .lean();

    const hasMore = found.length > DELETE_BATCH_SIZE;
    const deleted = found.slice(0, DELETE_BATCH_SIZE);

    await StockMovementModel.deleteMany({ _id: { $in: deleted.map(({ _id }) => _id) } });

    res.status(200).json({ deleted, hasMore });
};
