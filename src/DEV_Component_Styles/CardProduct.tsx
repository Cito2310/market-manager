import { IProductFormat } from '../../Types/product';
import { BtnIcon } from './BtnIcon';

import "./card-product.scss"
import { priceFormat } from '../helpers/priceFormat';

interface props {
    product: IProductFormat
}

export const CardProduct = ({product}: props) => {
    let { barcode, brand, category, name, price, sizeUnit } = {...product};

    return (
        <div className="card-product">

            <div className="row sb">
                <p className='txt-product'>{`${brand} ${name} ${sizeUnit[0]}${sizeUnit[1]}`}</p>

                <div className='row gap-8'>
                    <BtnIcon element='pencil'/>
                    <BtnIcon element='trash'/>
                </div>
            </div>


            <div className="row sb">
                <div className='column'>
                    <p className='txt-category'>{category}</p>
                    <p className='txt-barcode'>{barcode}</p>
                </div>

                <p className='txt-price'>{ "$ " + priceFormat( price ) }</p>
            </div>

        </div>
    )
}