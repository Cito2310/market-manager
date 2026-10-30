// No verificado por humano
import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { validateJWT } from "../../middlewares/validateJWT.js";
import { hasRole } from "../../middlewares/hasRole.js";
import { idParamsSchema } from "../../../../shared/common.schema.js";
import { stockSnapshotDeleteQuerySchema } from "../../../../shared/stockSnapshot.schema.js";
import {
    createStockSnapshot,
    deleteStockSnapshots,
    getCurrentStockSnapshot,
    getStockSnapshotById,
    getStockSnapshots
} from "./stockSnapshot.controller.js";

export const stockSnapshotRoutes = Router();

stockSnapshotRoutes.get("/", validateJWT, getStockSnapshots);

stockSnapshotRoutes.get("/current", validateJWT, getCurrentStockSnapshot);

stockSnapshotRoutes.get("/:id", validateJWT, validate({ params: idParamsSchema }), getStockSnapshotById);

stockSnapshotRoutes.post("/", validateJWT, createStockSnapshot);

stockSnapshotRoutes.delete(
    "/",
    validateJWT,
    hasRole("admin"),
    validate({ query: stockSnapshotDeleteQuerySchema }),
    deleteStockSnapshots
);
