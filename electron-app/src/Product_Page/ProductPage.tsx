import { setModalProduct } from "../store/modal";
import { useAppDispatch, useAppSelector } from "../store";
import { ModalCreateProduct, ModalDeleteProduct, ModalUpdateProduct, CardProduct } from "./components";
import { getProductInType } from "./helpers/getProductInType";
import { sortProduct } from "./helpers/sortProduct";
import { TopButtonProduct } from "./components/TopButtonProduct";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { joinTextProduct } from "./helpers/joinTextProduct";
import { Product } from "../../Types";

const findProduct = (products: Product[], searchTerm: string) => sortProduct(products.filter( product => RegExp(searchTerm, "i").test(joinTextProduct(product)) ))

export const ProductPage = () => {
    const { products } = useAppSelector( state => state.product );
    const { current } = useAppSelector( state => state.modal );
    const dispatch = useAppDispatch();
    const { register, getValues } = useForm()

    const [productsFiltered, setProductsFiltered] = useState(sortProduct(getValues().search ? findProduct(products, getValues().search) : products));


    const onSetModalCreateProduct = () => dispatch( setModalProduct( "createProduct" ) );

    const onSearch = () => setProductsFiltered(findProduct(products, getValues().search))
    
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