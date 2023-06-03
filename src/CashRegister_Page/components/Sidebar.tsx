import { Svg } from "../../components/Svg"

interface props {
    barcode: string;
}

export const Sidebar = ({ barcode }: props) => {
    return (
        <aside className="h-screen w-full bg-gray-800 p-3 flex flex-col justify-between">
            <div className="flex flex-col gap-3">
                <input className="rounded bg-white px-3 py-1 w-full focus:outline-none" onChange={()=>{}} value={barcode} placeholder="Codigo de Barra"/>

                <button 
                    className="
                        rounded p-1 items-center justify-center w-full
                        transition-base hover:brightness-[.90] active:brightness-[.80] 
                        bg-btn_secondary text-black flex
                    "
                >
                    <Svg element="search" classname="text"/>&nbsp;Buscar
                </button>
            </div>

            <div className="flex flex-col gap-3 mb-4">
                <button 
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
                >
                    <Svg element="print" classname="text-xl"/>
                    &nbsp;Imprimir Ticket
                </button>
            </div>
        </aside>
    )
}