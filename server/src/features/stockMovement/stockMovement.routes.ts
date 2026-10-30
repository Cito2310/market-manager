import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { validateJWT } from "../../middlewares/validateJWT.js";
import { stockMovementInputSchema, stockMovementQuerySchema } from "../../../../shared/stockMovement.schema.js";
import { createStockMovement, getStockMovements } from "./stockMovement.controller.js";

export const stockMovementRoutes = Router();

stockMovementRoutes.get("/", validateJWT, validate({ query: stockMovementQuerySchema }), getStockMovements);

stockMovementRoutes.post("/", validateJWT, validate({ body: stockMovementInputSchema }), createStockMovement);
