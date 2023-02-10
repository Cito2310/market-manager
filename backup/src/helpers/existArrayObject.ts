/*
Es una funcion que recibe dos argumentos
    arrayWithObject: Object[] = Es el array que contiene objetos y se analalizara en busca del elemento
    objectCompare: Object = Es el objeto que se buscara en el array

*/

/**
 * 
 * @param arrayWithObjects Object[] - It will be parsed to find the object
 * @param objectCompare Object - Is the object to search for in the array
 * @returns number - Returns the index where the object is found, returns -1 if the object was not found
 */

export const existArrayObject = (
    arrayWithObjects: {[key:string]:any}[],
    objectCompare: {[key: string]: any}

    ): number => {

        const keyTest: string[] = Object.keys(objectCompare)
        const objectFind = arrayWithObjects.find( object => 
                keyTest.every( key => object[key] === objectCompare[key])
        )

        if ( !objectFind ) return -1;
        
        return arrayWithObjects.indexOf(objectFind);
}