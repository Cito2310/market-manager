import { Request, Response } from "express";
import { IBodyCreateProduct, IBodyUpdateProduct } from "../../types/Product";
import { Product } from "./productModels";






export const createProduct = async( req: Request, res: Response ) => {
    try {
        const { __V, _id, ...newProductData } = req.body as IBodyCreateProduct;

        const newProduct = new Product( newProductData );
        await newProduct.save();

        return res.status(201).json(newProduct);

    } catch (error) { console.log(error); return res.status(500).json({ msg: "1500 - unexpected server error" }) }
}












export const getProducts = async( req: Request, res: Response ) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);

    } catch (error) { console.log(error); return res.status(500).json({ msg: "1500 - unexpected server error" }) }
}










export const deleteCategoryByBarcode = async( req: Request, res: Response ) => {
    try {
        let { barcodeProduct } = req.params;

        const product = await Product.findOneAndDelete({ barcode: barcodeProduct });

        return res.status(200).json(product);

    } catch (error) { console.log(error); return res.status(500).json({ msg: "1500 - unexpected server error" }) }
}










export const updateCategoryByBarcode = async( req: Request, res: Response ) => {
    try {
        let { barcodeProduct } = req.params;

        const { __V, _id, ...updateProductData } = req.body as IBodyUpdateProduct;
        
        const product = await Product.findOneAndUpdate({ barcode: barcodeProduct }, updateProductData, {  });

        return res.status(200).json(product);

    } catch (error) { console.log(error); return res.status(500).json({ msg: "1500 - unexpected server error" }) }
}