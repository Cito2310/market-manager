import { NavLink } from "react-router-dom"

import "../styles/bottom-bar.scss"
import { useContext } from 'react';
import { ContextDatabase } from '../providers/Database/ProviderDatabase';

export const BottomBar = () => {
    const { statusDB } = useContext(ContextDatabase);

    return (
        <div className="bottom-bar">
            <div>
                <NavLink to="/cash-register">Cash Register</NavLink>
                <NavLink to="/all-products">All Products</NavLink>
            </div>

            <p>status server :
                {
                    statusDB === "await" ? " await" :
                    statusDB === "offline" ? " offline" :
                    statusDB === "online" ? " online" : null
                }
            </p>
        </div>
    )
}