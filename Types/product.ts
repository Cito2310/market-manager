export interface IProduct {
    _id: string,
    barcode: string,
    brand: string,
    category: string,
    name: string,
    price: number,
    size: number,
}

export interface IProductFormat extends IProduct {
    sizeUnit: [number, string],
}

export interface IProductWithAmount extends IProductFormat {
    amount: number,
}