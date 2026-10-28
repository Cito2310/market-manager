import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { categoryInputSchema, categoryUpdateSchema } from "../../../../shared/category.schema.js";
import { idParamsSchema } from "../../../../shared/common.schema.js";
import { createCategory, deleteCategory, getCategories, updateCategory } from "./category.controller.js";
import { validateJWT } from "../../middlewares/validateJWT.js";

export const categoryRoutes = Router();

categoryRoutes.get("/", validateJWT, getCategories);

categoryRoutes.post("/", validateJWT, validate({ body: categoryInputSchema }), createCategory);

categoryRoutes.put(
    "/:id",
    validateJWT,
    validate({ params: idParamsSchema, body: categoryUpdateSchema }),
    updateCategory
);

categoryRoutes.delete("/:id", validateJWT, validate({ params: idParamsSchema }), deleteCategory);
