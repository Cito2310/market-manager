import { useContext } from 'react';
import { NavLink } from "react-router-dom"
import { ContextDatabase } from '../providers/Database/ProviderDatabase';
import "../styles/bottom-bar.scss"


export const BottomBar = () => {
    const { statusDB } = useContext(ContextDatabase);

    return (
        <div className="bottom-bar">
            <div>
                <NavLink to="/cash-register">Cash Register</NavLink>
                <NavLink to="/all-products">All Products</NavLink>
            </div>

            <p>status server : { statusDB }</p>
        </div>
    )
}