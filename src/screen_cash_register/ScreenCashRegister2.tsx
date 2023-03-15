// import { useEffect, useState } from 'react';
// import axios from "axios";

// import { detectKeyUp } from './detectKeyUp';

// import { loginResp } from '../../Types/axiosResponse';
// import { IProduct, IProductWithAmount } from '../../Types/product';

// import "./screen-cash-register.scss"
// import { priceFormat } from '../helpersAndHooks/priceFormat';
// // import { ModalNotFoundProduct } from '../modals/ModalNotFoundProduct';

// export const ScreenCashRegister = () => {
//     const [dataProduct, setDataProduct] = useState<IProduct[]>([]);
//     const [barcode, setBarcode] = useState<string>("");
//     const [shoppingCart, setShoppingCart] = useState<IProductWithAmount[]>([]);

//     // load data products
//     useEffect(() => {
//         const funcGetProducts = async() => {
//             const resp: loginResp = await axios.post("https://market-product-rest.onrender.com/api/user/login", {
//                 username: "adminUser",
//                 password: "adminUser",
//             })
//             if (resp.status === 200) {
//                 const data = await window.electronAPI.saveDataProduct(resp.data.token);
//                 setDataProduct(data);
//             }
//         }
//         funcGetProducts();
//     }, [])

//     // read barcode
//     useEffect(() => {
//         detectKeyUp(
//             (event)=>{setBarcode(barcode + event!.key)},
//             /^[0-9]+$/g
//         )
        
//         if (barcode.length === 13) {
//             // TODO Implementar : Buscar producto en base de datos y añadir a la lista de compra
//             const existShoppinCartIndex = shoppingCart.findIndex( value => value.barcode === barcode );
            
//             if (dataProduct.length === 0) {
//                 // TODO Implementar : Base de datos no operativa, espere


//             } else if (existShoppinCartIndex !== -1) {
//                 let newShoppingCart = [...shoppingCart];
//                 newShoppingCart[existShoppinCartIndex].amount++;
//                 setShoppingCart(newShoppingCart);
                

//             } else {
//                 const productSelect = dataProduct.find( value => value.barcode === barcode );
//                 // TODO Implementar : No se encontro un producto
//                 const productSelectWithAmount: IProductWithAmount = {...productSelect as IProduct, amount: 1};
//                 setShoppingCart([...shoppingCart, {...productSelectWithAmount}]);
//             }

//             setBarcode("");
//         }

//     }, [barcode])


//     return (
//         <>
//             {/* <ModalNotFoundProduct/> */}
//         <div className='screen-cash-register'>
//             <section className='section-shopping-cart'>
//                 <ul>
//                     <li className='product-item product-item-top'>
//                         <p className='product-item-text'>PRODUCTO</p>
//                         <p className='product-item-text'>PRECIO X U</p>
//                         <p className='product-item-text'>CANTIDAD</p>
//                         <p className='product-item-text'>TOTAL</p>
//                     </li>

//                     { shoppingCart.map( 
//                             ({ _id, barcode, brand, category, name, price, size, amount }, index) => <li key={barcode} className='product-item'>
//                                 <p className='product-item-text'>{`${brand} ${name} ${size}`}</p>
//                                 <p className='product-item-text'>{priceFormat( price )}</p>
//                                 <p className='product-item-text'>{amount}</p>
//                                 <p className='product-item-text'>{priceFormat( amount*price )}</p>
//                             </li>
//                     ) }
//                 </ul>
//             </section>

//             <section className='section-total'>
//                 <p className='total-price'>
//                     TOTAL : $ { priceFormat(shoppingCart.reduce((prev, curr) => prev + curr.price*curr.amount,0)) }
//                 </p>
//             </section>
//         </div>
//         </>
//     )
// }

export {}