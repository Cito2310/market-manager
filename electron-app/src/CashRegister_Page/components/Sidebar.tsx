import { useForm } from "react-hook-form";
import { Svg } from "../../components"
import { useEffect, useState } from "react";

interface props {
    barcode: string;
    onPrint: () => void;
    onReset: () => void;
    totalSum: number;
}

export const Sidebar = ({ barcode, onPrint, onReset, totalSum }: props) => {
    const {register, watch, getValues} = useForm()
    const [vuelto, setVuelto] = useState(0);

    useEffect(()=>{
        setVuelto( getValues().moneyClient - totalSum)
    }, [watch()])

    return (
        <aside className="h-full w-full bg-gray-800 p-3 flex flex-col justify-between">
            <div className="flex flex-col gap-3">
                <input className="rounded bg-white px-3 py-1 w-full focus:outline-none" onChange={()=>{}} value={barcode} placeholder="Codigo de Barra"/>
                
                <hr />
                <input 
                className="rounded bg-white px-3 py-1 w-full focus:outline-none" 
                {...register("moneyClient")}
                type="number"
                min={0} max={100000}
                placeholder="Dinero del cliente"
                />

                <p className="font-bold text-white">VUELTO: ${vuelto}</p>
                
            </div>

            <div className="flex flex-col gap-3 mb-4">
                <button 
                    onClick={ onReset }
                    className="
                        rounded p-3 items-center justify-center
                        transition-base hover:brightness-[.90] active:brightness-[.80] 
                        bg-btn_danger text-white flex
                    "
                >
                    <Svg element="trash" classname="text-xl"/>
                    &nbsp;Reiniciar
                </button>

                <button 
                    className="
                        rounded p-3 items-center justify-center
                        transition-base hover:brightness-[.90] active:brightness-[.80] 
                        bg-btn_primary text-white flex
                    "
                    onClick={ onPrint }
                >
                    <Svg element="print" classname="text-xl"/>
                    &nbsp;Imprimir Ticket
                </button>
            </div>
        </aside>
    )
}