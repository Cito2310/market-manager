export interface IProduct {
    _id: string,
    barcode: string,
    brand: string,
    category: string,
    name: string,
    price: number,
    size: string,
}

export interface IProductWithAmount extends IProduct {
    amount: number,
}