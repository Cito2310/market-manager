import { NavLink } from "react-router-dom"

export const BottomBar = () => {
    return (
        <div className="bg-zinc-900 text-white flex justify-between px-3">
            <div className="bg-inherit flex">

                <NavLink 
                    className="bg-inherit hover:brightness-125 h-full w-28 text-sm flex items-center justify-center" 
                    to="/" >
                        <p>Registradora</p>
                </NavLink>

                <NavLink 
                    className="bg-inherit hover:brightness-125 h-full w-28 text-sm flex items-center justify-center" 
                    to="/products" >
                        <p>Productos</p>
                </NavLink>

                <NavLink 
                    className="bg-inherit hover:brightness-125 h-full w-28 text-sm flex items-center justify-center" 
                    to="/categories" >
                        <p>Categorias</p>
                </NavLink>
                
            </div>

            <div className="flex items-end">
                <p className="text-xs pb-1">Cargando...</p>
            </div>
        </div>
    )
}