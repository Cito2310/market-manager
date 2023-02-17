export const priceFormat = ( price: number ) => {
    const priceFormat = price.toLocaleString("en-US")

    return price % 1 !== 0 
    ? priceFormat
    : priceFormat+".00"
}