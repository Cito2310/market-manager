interface IReqProduct {
    barcode: string,
    brand: string,
    category: string,
    name: string,
    price: number,
    size: number,
    unitType: string,
}

export const transformProductToAPI = (product: IReqProduct) => {
    return {
        barcode: product.barcode.toLocaleUpperCase(),
        brand: product.brand.toLocaleUpperCase(),
        category: product.category.toLocaleUpperCase(),
        name: product.name.toLocaleUpperCase(),
        price: product.price,
        size: product.size + product.unitType.toLocaleUpperCase(),
    }
}