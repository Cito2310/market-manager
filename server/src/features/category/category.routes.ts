import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { categoryInputSchema, categoryUpdateSchema } from "../../../../shared/category.schema.js";
import { idParamsSchema } from "../../../../shared/common.schema.js";
import { createCategory, deleteCategory, getCategories, updateCategory } from "./category.controller.js";

export const categoryRoutes = Router();

categoryRoutes.get("/", getCategories);

categoryRoutes.post("/", validate({ body: categoryInputSchema }), createCategory);

categoryRoutes.put("/:id", validate({ params: idParamsSchema, body: categoryUpdateSchema }), updateCategory);

categoryRoutes.delete("/:id", validate({ params: idParamsSchema }), deleteCategory);
