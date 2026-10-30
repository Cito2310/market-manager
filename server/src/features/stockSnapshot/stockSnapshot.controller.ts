// No verificado por humano
import { Request, Response } from "express";
import { HttpError } from "../../middlewares/errors/HttpError.js";
import { StockSnapshotModel } from "./stockSnapshot.model.js";
import { StockSnapshotDeleteQuery } from "../../../../shared/stockSnapshot.schema.js";
import { buildSnapshot } from "./buildSnapshot.js";
import { getStartOfMonth } from "./getStartOfMonth.js";

export const getStockSnapshots = async (_req: Request, res: Response) => {
    const stockSnapshots = await StockSnapshotModel.find({}, { lastMovementId: 1 }).sort({ createdAt: -1 });
    res.status(200).json(stockSnapshots);
};

export const getCurrentStockSnapshot = async (_req: Request, res: Response) => {
    const stockSnapshot = await buildSnapshot();
    res.status(200).json({ ...stockSnapshot, createdAt: new Date() });
};

export const getStockSnapshotById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const stockSnapshot = await StockSnapshotModel.findById(id);
    if (!stockSnapshot) throw new HttpError(404, "Stock snapshot not found");

    res.status(200).json(stockSnapshot);
};

export const createStockSnapshot = async (_req: Request, res: Response) => {
    const alreadyExists = await StockSnapshotModel.exists({ createdAt: { $gte: getStartOfMonth(new Date()) } });
    if (alreadyExists) throw new HttpError(409, "Stock snapshot already exists for this month");

    const newStockSnapshot = await StockSnapshotModel.create(await buildSnapshot());
    res.status(201).json(newStockSnapshot);
};

export const deleteStockSnapshots = async (req: Request, res: Response) => {
    const { before } = req.query as unknown as StockSnapshotDeleteQuery;

    const deleted = await StockSnapshotModel.find({ createdAt: { $lt: before } })
        .sort({ createdAt: 1 })
        .lean();

    await StockSnapshotModel.deleteMany({ _id: { $in: deleted.map(({ _id }) => _id) } });

    res.status(200).json({ deleted });
};
