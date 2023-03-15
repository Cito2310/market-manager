import { IProductFormat } from '../../Types/product';

export const sortABCProducts = (a: IProductFormat, b: IProductFormat) => {
    const joinNameA = `${a.category} ${a.brand} ${a.name} ${a.size}`;
    const joinNameB = `${b.category} ${b.brand} ${b.name} ${b.size}`;

    if ( joinNameA < joinNameB ) return -1;
    if ( joinNameA > joinNameB ) return 1;

    return 0;
}