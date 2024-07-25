import { selectProduct, setModalProduct } from "../../store/modal";
import { useAppDispatch } from "../../store";
import { ButtonSvg } from "../../components";
import { Product } from "../../../Types"

interface props {
    product: Product
}

export const CardProduct = ({ product }: props) => {
    const dispatch = useAppDispatch();

    const { barcode, brand, category, name, price, size, sizeUnit, subcategory, type } = product;

    const onDelete = () => {
        dispatch( selectProduct( product ) );
        dispatch( setModalProduct("deleteProduct") );
    }

    const onUpdate = () => {
        dispatch( selectProduct( product ) );
        dispatch( setModalProduct("updateProduct") );
    }

    return (
        <div className="bg-card_bg p-3 shadow-md rounded-md text-txt-black min-w-[400px] flex-1">
            <div className="flex justify-between gap-3">
                <h2 className="uppercase text-lg font-Montserrat font-medium text-black">{`${brand} ${subcategory} ${name} ${size}${sizeUnit}`}</h2>

                <div className="flex gap-2">
                    <ButtonSvg element="trash" onClick={onDelete} className="bg-card_btn text-card_btnText w-7"/>
                    <ButtonSvg element="pen" onClick={onUpdate} className="bg-card_btn text-card_btnText w-7"/>
                </div>
            </div>

            <div className="flex justify-between mt-1 items-end">
                <div>
                    <p className="capitalize font-Montserrat font-medium">{ category }</p>
                    <p className="font-Montserrat font-medium text-sm">{`${barcode} ${type}`}</p>
                </div>

                <div className="flex justify-end">
                    <p className="text-3xl font-Montserrat font-semibold">{`$ ${price}`}</p>
                </div>
            </div>

        </div>
    )
}