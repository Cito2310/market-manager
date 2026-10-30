// No verificado por humano
import { Batch } from "../../../../shared/product.schema.js";
import { roundQuantity } from "./roundQuantity.js";

export const consumeByExpiration = (batches: Batch[], quantityToSell: number) => {
    const sortedBatches = [...batches].sort(
        (a, b) =>
            (a.expirationDate?.getTime() ?? Infinity) - (b.expirationDate?.getTime() ?? Infinity) ||
            a.receivedAt.getTime() - b.receivedAt.getTime()
    );

    let remaining = quantityToSell;

    for (const batch of sortedBatches) {
        if (remaining === 0) break;
        if (batch.quantity <= 0) continue;

        const taken = Math.min(batch.quantity, remaining);
        batch.quantity = roundQuantity(batch.quantity - taken);
        remaining = roundQuantity(remaining - taken);
    }
};
