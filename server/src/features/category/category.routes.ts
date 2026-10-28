import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { categoryInputSchema, categoryUpdateSchema } from "../../../../shared/category.schema.js";
import { idParamsSchema } from "../../../../shared/common.schema.js";
import { getCategories } from "./controllers/getCategories.js";
import { createCategory } from "./controllers/createCategory.js";
import { updateCategory } from "./controllers/updateCategory.js";
import { deleteCategory } from "./controllers/deleteCategory.js";


export const categoryRoutes = Router();


categoryRoutes.get("/", getCategories);


categoryRoutes.post("/", validate({ body: categoryInputSchema }), createCategory);


categoryRoutes.put("/:id", validate({ params: idParamsSchema, body: categoryUpdateSchema }), updateCategory);


categoryRoutes.delete("/:id", validate({ params: idParamsSchema }), deleteCategory);
