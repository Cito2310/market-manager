import { setModalProduct } from "../store/modal";
import { useAppDispatch, useAppSelector } from "../store";
import { ModalCreateProduct, ModalDeleteProduct, ModalUpdateProduct, CardProduct } from "./components";
import { getProductInType } from "./helpers/getProductInType";
import { sortProduct } from "./helpers/sortProduct";
import { TopButtonProduct } from "./components/TopButtonProduct";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { joinTextProduct } from "./helpers/joinTextProduct";

export const ProductPage = () => {
    const { products } = useAppSelector( state => state.product );
    const { current } = useAppSelector( state => state.modal );
    const dispatch = useAppDispatch();

    const [productsFiltered, setProductsFiltered] = useState(sortProduct(products));

    const { register, getValues } = useForm()

    const onSetModalCreateProduct = () => dispatch( setModalProduct( "createProduct" ) );

    const onSearch = () => setProductsFiltered(sortProduct (products.filter( product => RegExp(getValues().search).test(joinTextProduct(product)) )))
    
    useEffect(() => { setProductsFiltered(sortProduct(products)) }, [products])
    

    return (
        <div className="flex flex-wrap gap-5 p-5">

            <TopButtonProduct onSearch={onSearch} onSetModalCreateProduct={onSetModalCreateProduct} registerReturn={register("search")}/>

            { getProductInType( productsFiltered ).map( majorCategory => 
                <section key={majorCategory.name} className="">
                    <h2 className="uppercase font-Montserrat font-bold text-[1.8em] ml-1" >{majorCategory.name}</h2>
                    <div className="flex flex-wrap gap-5">
                        {majorCategory.products.map( product => <CardProduct key={ product.barcode } product={ product } /> )}
                    </div>
                </section>
            )
            }
            

            { current === "createProduct" && <ModalCreateProduct/> }
            { current === "updateProduct" && <ModalUpdateProduct/> }
            { current === "deleteProduct" && <ModalDeleteProduct/> }
        </div>
    )
}