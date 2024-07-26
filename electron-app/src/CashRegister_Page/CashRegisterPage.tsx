import { Sidebar, TopItem, ItemProductCart, ModalNotFoundProduct, ModalResetCart } from "./components";
import { parseNumber } from "../helpers";
import { useCashRegister } from "./hooks/useCashRegister";


export const CashRegisterPage = () => {
    const { barcode, currentModal, onExitModal, onModalReset, onPrint, onResetCart, productsCart, totalSum } = useCashRegister()

    return (
        <>
            <section className="grid grid-cols-[1fr_300px] w-screen h-full bg-white">
                <div className="flex flex-col justify-between">
                    <div>
                        <TopItem />

                        <ul>
                            { productsCart.map(( productCart, index ) => 
                                <ItemProductCart key={ productCart.barcode } productCart={ productCart } index={ index }/>
                            )}
                        </ul>
                    </div>


                    <div className="bg-white justify-end flex border-t border-gray-500 p-1 px-3">
                        <p className="text-4xl font-semibold">$ { parseNumber( totalSum ) }</p>
                    </div>
                </div>

                <Sidebar 
                    onPrint={ onPrint }
                    onReset={ onModalReset }
                    barcode={ barcode }
                />
            </section>

            { currentModal === "resetCart" && <ModalResetCart onExit={ onExitModal } onResetCart={ onResetCart } /> }
            { currentModal === "notFoundProduct" && <ModalNotFoundProduct /> }
        </>
    )
}