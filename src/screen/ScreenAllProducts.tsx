import { useContext } from 'react';

import { CardProduct } from "../components/CardProduct";
import { MenuControllerProducts } from "../components/MenuControllerProducts";

import { ContextDatabase } from '../providers/Database/ProviderDatabase';

import "../styles/screen-all-products.scss"


export const ScreenAllProducts = () => {
    const { product } = useContext(ContextDatabase);

    return (
        <section className="screen-all-products">
            {
                product.map((productUnit, index) => <CardProduct key={index+"cardProduct"} product={productUnit}/> )
            }

            <MenuControllerProducts/>
        </section>
    )
}