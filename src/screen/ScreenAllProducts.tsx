import "../styles/screen-all-products.scss"
// import { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { IProduct } from '../../Types/product';
// import { CardProduct } from "../components/CardProduct";
// import { MenuControllerProducts } from "../components/MenuControllerProducts";
// import { ContextProducts } from "../providers/Database/ProviderProducts";

// interface props {
//     token: string
// }

// export const ScreenAllProducts = ({ token }: props) => {
//     const { products } = useContext(ContextProducts);

//     return (
//         <section className="screen-all-products">
//             {
//                 products.map((product, index) => <CardProduct key={index+"cardProduct"} product={product}/> )
//             }

//             <MenuControllerProducts/>
//         </section>
//     )
// }