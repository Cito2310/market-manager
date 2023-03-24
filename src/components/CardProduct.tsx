import { useContext } from 'react';
import { ContextModal } from '../providers';
import { IProductFormat } from '../../Types/product';
import "../styles/card-product.scss"
import { BtnIcon } from './BtnIcon';
import { priceFormat } from '../helpers/priceFormat';


interface props { product: IProductFormat }

export const CardProduct = ({ product }: props) => {
    const { barcode, brand, category, name, price, sizeUnit } = product;

    // ON CONTROLLER MODALS
    const { setCurrentModal, setProductSelected } = useContext(ContextModal)
    const onModifyProduct = () => { setCurrentModal("modify-product"); setProductSelected(product) }
    const onDeleteProduct = () => { setCurrentModal("delete-product"); setProductSelected(product)  }


    return (
        <div className='card-product'>
            <div className='row sb gap-8'>
                <p className='txt-product'>{brand} {name} {sizeUnit[0]}{sizeUnit[1]}</p>

                <div className='row gap-8'>
                    <BtnIcon onClickFunc={onModifyProduct} color="green" element='pencil'/>
                    <BtnIcon onClickFunc={onDeleteProduct} color="red" element='trash'/>
                </div>
            </div>

            <div className='row sb'>
                <div className='column'>
                    <p className='txt-category'>{ category }</p>
                    <p className='txt-barcode'>{ barcode }</p>
                </div>

                <p className='txt-price'>{ "$ " + priceFormat( price ) }</p>
            </div>
        </div>
    )
}