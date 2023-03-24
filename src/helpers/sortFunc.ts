import { IProductFormat } from '../../Types/product';
import { IRespCategories } from '../../Types/categories';

export const sortProducts = (a: IProductFormat, b: IProductFormat) => {
    const joinNameA = `${a.category} ${a.brand} ${a.name} ${a.size}`;
    const joinNameB = `${b.category} ${b.brand} ${b.name} ${b.size}`;

    if ( joinNameA < joinNameB ) return -1;
    if ( joinNameA > joinNameB ) return 1;

    return 0;
}

export const sortCategories = (a: IRespCategories, b: IRespCategories) => {
    if ( a.category < b.category ) return -1;
    if ( a.category > b.category ) return 1;

    return 0;
}