import { InputNumber } from "../Inputs"
import { useForm } from "../../hooks/useForm"
import { IProductWithAmount } from "../../../Types/product"

interface props {
    onExit: () => void
    product: IProductWithAmount | undefined
    onChangeAmountProduct: (product: IProductWithAmount, newAmount: number) => void
}

export const ModalChangeAmount = ({onExit, product, onChangeAmountProduct}: props) => {
    const {amount, onInputChange} = useForm({amount: product?.amount || 0})
    console.log(product)

    return (
        <>
            <div className="modal-container">
                <div className="row sb">
                    <h2>Cantidad</h2>
                </div>

                <div className="body-container">
                    <InputNumber
                        name="amount"
                        onChange={onInputChange}
                        value={amount}
                        length={{min: 1, max: 300}}
                        decimal
                    />
                </div>

                <div className="row gap-12 reverse">
                    <button className="btn primary" onClick={()=>onChangeAmountProduct(product as IProductWithAmount, amount)}>Cambiar</button>
                    <button className="btn secondary" onClick={onExit}>Rechazar</button>
                </div>
            </div>

            <div className="black-screen" />
        </>
    )
}