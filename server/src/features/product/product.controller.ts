import { Request, Response } from "express";
import { ProductInput, ProductUpdate } from "../../../../shared/product.schema.js";
import { ProductModel } from "./product.model.js";
import { assertCategoryRefs } from "./assertCategoryRefs.js";
import { HttpError } from "../../middlewares/errors/HttpError.js";

export const getProducts = async (req: Request, res: Response) => {
    const products = await ProductModel.find();
    res.status(200).json(products);
};

export const createProduct = async (req: Request, res: Response) => {
    const bodyProduct = req.body as ProductInput;
    const { _id } = req.user;

    await assertCategoryRefs(bodyProduct.details);

    const newProduct = await ProductModel.create({ ...bodyProduct, createdBy: _id, updatedBy: _id });

    res.status(201).json(newProduct);
};

export const updateProduct = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { __v, ...bodyProduct } = req.body as ProductUpdate;
    const { _id } = req.user;

    const product = await ProductModel.findById(id);
    if (!product) throw new HttpError(404, "Product not found");

    if (__v !== product.__v) throw new HttpError(409, "Product was modified by someone else");

    await assertCategoryRefs(bodyProduct.details);

    product.overwrite({ ...bodyProduct, createdBy: product.createdBy, updatedBy: _id });
    await product.save();

    res.status(200).json(product);
};

export const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { _id } = req.user;

    const product = await ProductModel.findByIdAndUpdate(
        id,
        { active: false, updatedBy: _id, $inc: { __v: 1 } },
        { returnDocument: "after" }
    );
    if (!product) throw new HttpError(404, "Product not found");

    res.status(200).json(product);
};
