import { useCallback, useContext, useEffect, useState } from 'react';

import { CardProduct } from "../components/CardProduct";
import { MenuControllerProducts } from "../components/MenuControllerProducts";

import { ContextDatabase, ContextModal } from '../providers';

import "../styles/screen-all-products.scss"
import { detectKeyUp } from '../helpers/detectKeyUp';


export const ScreenAllProducts = () => {
    const { product } = useContext(ContextDatabase);
    const { setCurrentModal, currentModal } = useContext(ContextModal);

    detectKeyUp(()=>setCurrentModal("create-product"), /\+/g);

    const [search, setSearch] = useState("");
    const filterSearchProducts = () => product.filter(({barcode, brand, category, name, size})=> {
        const allData = `${barcode} ${brand} ${category} ${name} ${size}`.toUpperCase();
        const regex = new RegExp(search.toUpperCase());
        if (regex.test(allData)) return true;
        return false;
    })

    return (
        <section className="screen-all-products">
            {
                search ? 

                filterSearchProducts().map((productUnit, index)=> <CardProduct key={index+"cardProduct"} product={productUnit}/>) : 
                
                product.map((productUnit, index) => <CardProduct key={index+"cardProduct"} product={productUnit}/> )
            }

            <MenuControllerProducts search={search} setSearch={setSearch}/>
        </section>
    )
}