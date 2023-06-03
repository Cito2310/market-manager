export const parseNumber = ( number: number ) => {
    const numberTwoDecimals = number.toFixed(2);
    const NumberToString = String( numberTwoDecimals );
    
    return NumberToString.replace(".", ",")

}