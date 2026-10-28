import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { validateJWT } from "../../middlewares/validateJWT.js";
import { productInputSchema, productUpdateSchema } from "../../../../shared/product.schema.js";
import { idParamsSchema } from "../../../../shared/common.schema.js";
import { createProduct, deleteProduct, getProducts, updateProduct } from "./product.controller.js";

export const productRoutes = Router();

productRoutes.get("/", validateJWT, getProducts);

productRoutes.post("/", validateJWT, validate({ body: productInputSchema }), createProduct);

productRoutes.put("/:id", validateJWT, validate({ params: idParamsSchema, body: productUpdateSchema }), updateProduct);

productRoutes.delete("/:id", validateJWT, validate({ params: idParamsSchema }), deleteProduct);
