import { useAppDispatch } from "../../store";
import { deleteProductInCartByBarcode } from "../../store/cashRegister";
import { Svg } from "../../components";
import { parseNameProduct, parseNumber } from '../../helpers';
import { ProductInCart } from "../../../Types"


interface props {
    productCart: ProductInCart;
    index: number;
}


export const ItemProductCart = ({ productCart, index }: props) => {
    const { amount, barcode, brand, category, name, price, size, typeSize, subCategory, type } = productCart;
    const isPair = index % 2 === 0;

    const dispatch = useAppDispatch();

    const deleteProduct = () => dispatch( deleteProductInCartByBarcode( barcode ) )

    return (
        <li 
            className={`
                grid grid-cols-[1fr_7em_7em_7em_1.6em] px-3 py-1 items-center 
                ${ isPair && "bg-[#f0f0f0]" }`
                }>
                    {/* @ts-ignore */}
            <p className="capitalize">{ parseNameProduct( productCart ) }</p>
            {
                type === "weight" 
                ? <p className="mx-auto">{ parseNumber( amount ) }Kg</p>
                : <p className="mx-auto">{ amount }</p>
            }

            <p className="mx-auto">$ { parseNumber( price ) }</p>
            <p className="mx-auto">$ { parseNumber( amount * price ) }</p>

            <button onClick={ deleteProduct } className="transition-base text-card_btnText hover:text-black active:text-btn_danger cursor-pointer">
                <Svg classname="text-xl m-auto" element="xmark"/>
            </button>
        </li>
    )
}