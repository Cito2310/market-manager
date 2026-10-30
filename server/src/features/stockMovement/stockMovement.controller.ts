// No verificado por humano
import { Request, Response } from "express";
import { HttpError } from "../../middlewares/errors/HttpError.js";
import { StockMovementModel } from "./stockMovement.model.js";
import { ProductModel } from "../product/product.model.js";
import { UserModel } from "../auth/auth.model.js";
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

    const filter = { occurredAt: getDateRange(from, to), ...(productId && { productId: { $in: productId } }) };

    const stockMovements = await StockMovementModel.find(filter).sort({ occurredAt: -1 });
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
    const saleInputs = (req.body as SaleBatchInput)
        .map((saleInput, index) => ({ saleInput, index }))
        .sort((a, b) => a.saleInput.occurredAt.getTime() - b.saleInput.occurredAt.getTime());

    const productIds = [...new Set(saleInputs.map(({ saleInput }) => saleInput.productId))];
    const userIds = [...new Set(saleInputs.map(({ saleInput }) => saleInput.createdBy))];

    const users = await UserModel.find({ _id: { $in: userIds } }, { _id: 1 }).lean();
    const existingUserIds = new Set(users.map(({ _id }) => String(_id)));

    const result = await mongoose.connection.transaction(async (session) => {
        const products = await ProductModel.find({ _id: { $in: productIds } }).session(session);
        const productsById = new Map(products.map((product) => [String(product._id), product]));

        const accepted: SaleBatchInput = [];
        const rejected: { index: number; productId: string; reason: string }[] = [];

        for (const { saleInput, index } of saleInputs) {
            const product = productsById.get(saleInput.productId);

            if (!product) {
                rejected.push({ index, productId: saleInput.productId, reason: "Product not found" });
                continue;
            }

            if (!existingUserIds.has(saleInput.createdBy)) {
                rejected.push({ index, productId: saleInput.productId, reason: "User not found" });
                continue;
            }

            consumeByExpiration(product.inventory.batches, -saleInput.quantity);
            accepted.push(saleInput);
        }

        for (const product of products) {
            await product.save({ session });
        }

        const newStockMovements = await StockMovementModel.insertMany(accepted, { session });

        return { accepted: newStockMovements, rejected };
    });

    res.status(200).json(result);
};

export const deleteStockMovements = async (req: Request, res: Response) => {
    const { before } = req.query as unknown as StockMovementDeleteQuery;

    const found = await StockMovementModel.find({ occurredAt: { $lt: before } })
        .sort({ occurredAt: 1 })
        .limit(DELETE_BATCH_SIZE + 1)
        .lean();

    const hasMore = found.length > DELETE_BATCH_SIZE;
    const deleted = found.slice(0, DELETE_BATCH_SIZE);

    await StockMovementModel.deleteMany({ _id: { $in: deleted.map(({ _id }) => _id) } });

    res.status(200).json({ deleted, hasMore });
};
