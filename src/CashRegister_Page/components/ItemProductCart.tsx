import { ProductInCart } from "../../../Types/ProductInCart"

interface props {
    productCart: ProductInCart;
    index: number;
}

export const ItemProductCart = ({ productCart, index }: props) => {
    const { amount, barcode, brand, category, name, price, size, sizeUnit, subcategory, type } = productCart;
    const isPair = index % 2 === 0;

    return (
        <li 
            className={`
                grid grid-cols-[1fr_7em_7em_7em] py-1 items-center 
                ${ isPair && "bg-[#f0f0f0]" }`
                }>
            <p className="ml-3 capitalize">{`${brand} ${subcategory} ${name} ${size+sizeUnit}`}</p>
            <p className="mx-auto">{ amount }</p>
            <p className="mx-auto">$ { price }</p>
            <p className="mx-auto">$ { amount * price }</p>
        </li>
    )
}