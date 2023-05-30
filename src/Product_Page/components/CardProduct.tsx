import { Product } from "../../../Types/product"
import { ButtonSvg } from "../../components/ButtonSvg";

interface props {
    product: Product
}

export const CardProduct = ({ product }: props) => {
    const { barcode, brand, category, name, price, size, sizeUnit, subcategory, type } = product;

    return (
        <div className="bg-card_bg p-3 rounded-md text-txt-black min-w-[400px]">
            <div className="flex justify-between gap-3">
                <h2 className="uppercase text-lg font-Montserrat font-medium text-black">{`${brand} ${subcategory} ${name} ${size}${sizeUnit}`}</h2>

                <div className="flex gap-2">
                    <ButtonSvg element="trash" onClick={()=>{}} className="bg-card_btn text-card_btnText w-7"/>
                    <ButtonSvg element="pen" onClick={()=>{}} className="bg-card_btn text-card_btnText w-7"/>
                </div>
            </div>

            <div className="flex justify-between mt-1 items-end">
                <div>
                    <p className="capitalize font-Montserrat font-medium">{ category }</p>
                    <p className="font-Montserrat font-medium text-sm">{barcode}</p>
                </div>

                <div className="flex justify-end">
                    <p className="text-3xl font-Montserrat font-semibold">{`$ ${price}`}</p>
                </div>
            </div>

        </div>
    )
}