import { Router } from "express";
import { check } from "express-validator";

import { 
    createCategory, 
    deleteCategoryById,
    getCategories,
    updateCategoryById
} from './categoryControllers';

import { checkFields } from '../../middlewares/checkFields';
import { validateJWT } from '../../middlewares/validateJWT';
import { arrayOnlySubcategories, existCategoryId, notExistCategory, validType } from "../../helpers/validationCategory";

export const routeCategory = Router();




routeCategory.post("/", [
    validateJWT,

    check("name").trim()
        .notEmpty().withMessage("name is required")
        .isString().withMessage("name not is string")
        .isLength({max: 24}).withMessage("name max length 24")
        .custom( notExistCategory ).withMessage("already exist category")
    ,

    check("type").trim()
        .notEmpty().withMessage("type is required")
        .isString().withMessage("type not is string")
        .isLength({max: 24}).withMessage("type max length 24")
        .custom( validType ).withMessage("not valid type")
    ,
        
    checkFields
], createCategory)




routeCategory.get("/", [ 
    validateJWT 
    
], getCategories)




routeCategory.delete("/:idCategory", [
    validateJWT,

    check("idCategory")
        .isMongoId().withMessage("id invalid")
        .custom( existCategoryId ).withMessage("not exist category with this id")
    ,

    checkFields
], deleteCategoryById)




routeCategory.put("/:idCategory", [ 
    validateJWT,

    check("idCategory")
        .isMongoId().withMessage("id invalid")
        .custom( existCategoryId ).withMessage("not exist category with this id")
    ,

    check("name").trim().optional()
        .isString().withMessage("name not is string")
        .isLength({max: 24}).withMessage("name max length 24")
    ,

    check("type").trim().optional()
        .isString().withMessage("type not is string")
        .isLength({max: 24}).withMessage("type max length 24")
        .custom( validType ).withMessage("not valid type")
    ,

    check("subcategories").optional()
        .custom( arrayOnlySubcategories ).withMessage("subcategories content item not object valid")
    ,

    checkFields
], updateCategoryById)