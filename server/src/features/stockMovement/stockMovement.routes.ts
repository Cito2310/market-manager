// No verificado por humano
import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { validateJWT } from "../../middlewares/validateJWT.js";
import { hasRole } from "../../middlewares/hasRole.js";
import {
    saleBatchInputSchema,
    stockMovementDeleteQuerySchema,
    stockMovementInputSchema,
    stockMovementQuerySchema
} from "../../../../shared/stockMovement.schema.js";
import {
    createSaleStockMovements,
    createStockMovement,
    deleteStockMovements,
    getStockMovements
} from "./stockMovement.controller.js";

export const stockMovementRoutes = Router();

stockMovementRoutes.get("/", validateJWT, validate({ query: stockMovementQuerySchema }), getStockMovements);

stockMovementRoutes.post("/", validateJWT, validate({ body: stockMovementInputSchema }), createStockMovement);

stockMovementRoutes.post("/sales", validateJWT, validate({ body: saleBatchInputSchema }), createSaleStockMovements);

stockMovementRoutes.delete(
    "/",
    validateJWT,
    hasRole("admin"),
    validate({ query: stockMovementDeleteQuerySchema }),
    deleteStockMovements
);
