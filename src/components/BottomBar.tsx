import { useContext } from 'react';
import { NavLink } from "react-router-dom"
import { ContextDatabase } from '../providers';
import "../styles/bottom-bar.scss"

export const BottomBar = () => {
    const { statusDB } = useContext(ContextDatabase);

    return (
        <div className="bottom-bar">
            <div className='row'>
                <NavLink to="/cash-register">Cash Register</NavLink>
                <NavLink to="/all-products">All Products</NavLink>
                <NavLink to="/categories">Categories</NavLink>
            </div>

            <p>status server : { statusDB }</p>
        </div>
    )
}