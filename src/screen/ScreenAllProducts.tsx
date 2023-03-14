import "../styles/screen-all-products.scss"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IProduct } from '../../Types/product';
import { CardProduct } from "../components/CardProduct";

interface props {
    token: string
}

export const ScreenAllProducts = ({ token }: props) => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        axios.get(
            "https://market-product-rest.onrender.com/api/product/",
            { headers: { token }}
        )
            .then( resp => { setProducts(resp.data) } )
    }, [])
    

    return (
        <section className="screen-all-products">
            {
                products.map((product, index) => <CardProduct key={index+"cardProduct"} product={product}/> )
            }
        </section>
    )
}