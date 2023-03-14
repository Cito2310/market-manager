import { NavLink } from "react-router-dom"
import "../styles/bottom-bar.scss"

export const BottomBar = () => {
    return (
        <div className="bottom-bar">
            <NavLink to="/cash-register">Cash Register</NavLink>
            <NavLink to="/all-products">All Products</NavLink>
        </div>
    )
}