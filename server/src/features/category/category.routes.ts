import { Router } from "express";
import { createdByRules, updatedByRules } from "../../helpers/validationRules.js";
import { checkFields } from "../../middlewares/checkFields.js";
import { categoryRules, idRules } from "./category.validators.js";
import { getCategories } from "./controllers/getCategories.js";
import { createCategory } from "./controllers/createCategory.js";
import { updateCategory } from "./controllers/updateCategory.js";
import { deleteCategory } from "./controllers/deleteCategory.js";


export const categoryRoutes = Router();


categoryRoutes.get("/", getCategories);


categoryRoutes.post("/", 
    [
        ...categoryRules, 
        createdByRules, 
        updatedByRules, 
        checkFields
], createCategory);


categoryRoutes.put("/:id", [
    idRules, 
    ...categoryRules, 
    updatedByRules, 
    checkFields
], updateCategory);


categoryRoutes.delete("/:id", [
    idRules, 
    checkFields
], deleteCategory);
