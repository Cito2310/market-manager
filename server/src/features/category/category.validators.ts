import { body, param } from "express-validator";
import { SECTIONS } from "../../../../shared/Category.js";
import type { Subcategory } from "../../../../shared/Category.js";
import { stringRules } from "../../helpers/validationRules.js";

const NAME_OPTIONS = { min: 2, max: 50 };

const hasUniqueValues = (values: string[]): boolean => new Set(values).size === values.length;

export const idRules = param("id").isMongoId().withMessage("Invalid category id");

export const categoryRules = [
    body("section").isIn(SECTIONS).withMessage(`Section must be one of: ${SECTIONS.join(", ")}`),
    stringRules("name", "Name", NAME_OPTIONS),
    body("subcategories").optional().isArray().withMessage("Subcategories must be an array"),
    stringRules("subcategories.*.name", "Subcategory name", NAME_OPTIONS),
    body("subcategories.*.brands").optional().isArray().withMessage("Brands must be an array"),
    stringRules("subcategories.*.brands.*", "Brand", NAME_OPTIONS),
    body("active").optional().isBoolean().withMessage("Active must be a boolean"),
    body("subcategories")
        .optional()
        .custom((subcategories: Subcategory[]) =>
            hasUniqueValues(subcategories.map((subcategory) => subcategory.name))
        )
        .withMessage("Subcategory names must be unique inside the category"),
    body("subcategories.*.brands")
        .optional()
        .custom((brands: string[]) => hasUniqueValues(brands))
        .withMessage("Brands must be unique inside the subcategory")
];
