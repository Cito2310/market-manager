// No verificado por humano
import { ProductModel } from "../product/product.model.js";
import { StockMovementModel } from "../stockMovement/stockMovement.model.js";
import { roundQuantity } from "../stockMovement/roundQuantity.js";

export const buildSnapshot = async () => {
    const [products, lastMovement] = await Promise.all([
        ProductModel.find().select("inventory.batches.quantity").lean(),
        StockMovementModel.findOne({}, { _id: 1 }).sort({ createdAt: -1, _id: -1 }).lean()
    ]);

    return {
        lastMovementId: lastMovement?._id ?? null,
        items: products.map((product) => ({
            productId: product._id,
            quantity: roundQuantity(product.inventory.batches.reduce((total, batch) => total + batch.quantity, 0))
        }))
    };
};
