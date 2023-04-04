import { IProductFormat, IProduct } from '../../Types/product';

export const formatProduct = ( product: IProduct ): IProductFormat => {
    const { _id, barcode, brand, category, name, price, size } = product;

    const capitalizeText = (string: string): string => {
        const copyString = string.slice().toLocaleLowerCase();
        return copyString[0].toLocaleUpperCase() + copyString.slice(1)
    }

    const getUnitAndSize = ( string: unknown ): [number, string] => {
        // @ts-ignore
        let size = Number(string.match(/[0-9.]+/)[0]);
        // @ts-ignore
        let unit = string.match(/[a-zA-Z]+[0-9]+|[a-zA-Z]+/)[0];
        
        return [size, unit]
    }

    const newProduct: IProductFormat = {
        _id,
        barcode,
        brand,
        category: capitalizeText( category ),
        name: name,
        price: price,
        size: size,
        sizeUnit: getUnitAndSize(size),
    }

    return newProduct;
}