import { Router } from "express";
import { check } from "express-validator";

import { 
    createProduct,
    getProducts,
    deleteCategoryByBarcode,
    updateCategoryByBarcode
} from './productControllers';

import { checkFields } from '../../middlewares/checkFields';
import { validateJWT } from '../../middlewares/validateJWT';
import { typeValid, uniqueBarcode, unitSizeValid } from "../../helpers/validationProduct";

export const routeProduct = Router();




routeProduct.post("/", [
    validateJWT,

    check("brand").trim()
        .notEmpty().withMessage("brand is required")
        .isString().withMessage("brand not is string")
        .isLength({max: 24}).withMessage("brand max length 24"),

    check("category").trim()
        .notEmpty().withMessage("category is required")
        .isString().withMessage("category not is string")
        .isLength({max: 24}).withMessage("category max length 24"),

    check("subCategory").trim()
        .notEmpty().withMessage("subCategory is required")
        .isString().withMessage("subCategory not is string")
        .isLength({max: 24}).withMessage("subCategory max length 24"),

    check("majorCategory").trim()
        .notEmpty().withMessage("majorCategory is required")
        .isString().withMessage("majorCategory not is string")
        .isLength({max: 24}).withMessage("majorCategory max length 24"),




    check("barcode").trim()
        .notEmpty().withMessage("barcode is required")
        .isString().withMessage("barcode not is string")
        .isLength({max: 20}).withMessage("barcode max length 20")
        .custom( uniqueBarcode ).withMessage("barcode already exist"),

    check("name").trim()
        .notEmpty().withMessage("name is required")
        .isString().withMessage("name not is string")
        .isLength({max: 24}).withMessage("name max length 24"),

    check("price").trim()
        .notEmpty().withMessage("price is required")
        .isNumeric().withMessage("price not is number")
        .isLength({max: 24}).withMessage("price length can only be less than 24 characters"),

    check("type").trim()
        .notEmpty().withMessage("type is required")
        .isString().withMessage("type not is string")
        .custom( typeValid ).withMessage("type invalid [ weight | unit ]"),




    check("size").trim()
        .notEmpty().withMessage("size is required")
        .isNumeric().withMessage("size not is number")
        .isLength({max: 24}).withMessage("size length can only be less than 24 characters"),

    check("typeSize").trim()
        .notEmpty().withMessage("typeSize is required")
        .isString().withMessage("typeSize not is string")
        .custom( unitSizeValid ).withMessage("typeSize invalid [kg, g, oz, cm3, l, ml, cc, u]"),
    
    checkFields
], createProduct)




routeProduct.get("/", getProducts)




routeProduct.delete("/:barcodeProduct", [
    validateJWT,

    check("barcodeProduct")
        .isString().withMessage("barcode not is string")
        .isLength({max: 20}).withMessage("barcode max length 20")
        .not().custom( uniqueBarcode ).withMessage("barcode not exist"),

    checkFields
], deleteCategoryByBarcode)




routeProduct.put("/:idCategory", [ 
    validateJWT,

    check("barcodeProduct")
        .isString().withMessage("barcode not is string")
        .isLength({max: 20}).withMessage("barcode max length 20")
        .not().custom( uniqueBarcode ).withMessage("barcode not exist"),



    check("brand").trim().optional()
        .notEmpty().withMessage("brand is required")
        .isString().withMessage("brand not is string")
        .isLength({max: 24}).withMessage("brand max length 24"),

    check("category").trim().optional()
        .notEmpty().withMessage("category is required")
        .isString().withMessage("category not is string")
        .isLength({max: 24}).withMessage("category max length 24"),

    check("subcategory").trim().optional()
        .notEmpty().withMessage("subcategory is required")
        .isString().withMessage("subcategory not is string")
        .isLength({max: 24}).withMessage("subcategory max length 24"),

    check("majorCategory").trim().optional()
        .notEmpty().withMessage("majorCategory is required")
        .isString().withMessage("majorCategory not is string")
        .isLength({max: 24}).withMessage("majorCategory max length 24"),



    check("name").trim().optional()
        .notEmpty().withMessage("name is required")
        .isString().withMessage("name not is string")
        .isLength({max: 24}).withMessage("name max length 24"),

    check("price").trim().optional()
        .notEmpty().withMessage("price is required")
        .isNumeric().withMessage("price not is number")
        .isLength({max: 24}).withMessage("price length can only be less than 24 characters"),

    check("type").trim().optional()
        .notEmpty().withMessage("type is required")
        .isString().withMessage("type not is string")
        .custom( typeValid ).withMessage("type invalid [ weight | unit ]"),



    check("size").trim().optional()
        .notEmpty().withMessage("size is required")
        .isNumeric().withMessage("size not is number")
        .isLength({max: 24}).withMessage("size length can only be less than 24 characters"),

    check("sizeUnit").trim().optional()
        .notEmpty().withMessage("sizeUnit is required")
        .isString().withMessage("sizeUnit not is string")
        .custom( unitSizeValid ).withMessage("sizeUnit invalid [kg, g, oz, cm3, l, ml, cc, u]"),
    

    checkFields
], updateCategoryByBarcode)