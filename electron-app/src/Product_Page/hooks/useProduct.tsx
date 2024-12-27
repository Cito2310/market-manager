import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../store";
import { setModalProduct } from "../../store/modal";

import { filterSearchProduct } from "../helpers/filterSearchProduct";



export const useProduct = () => {
    // INITIAL DATA
    const { products } = useAppSelector( state => state.product );
    const { current } = useAppSelector( state => state.modal );
    const dispatch = useAppDispatch();
    const { register, getValues } = useForm();

    // FUNCTION SET-MODAL CREATE PRODUCT
    const onSetModalCreateProduct = () => dispatch( setModalProduct( "createProduct" ) );
    
    // FUNCTION PRODUCT FILTERED
    const [productsFiltered, setProductsFiltered] = useState(filterSearchProduct(products, getValues().search));
    useEffect(() => { setProductsFiltered(filterSearchProduct(products, getValues().search)) }, [products])
    const onSearch = () => setProductsFiltered(filterSearchProduct(products, getValues().search))

    return {
        modal: {
            current,
            onSetModalCreateProduct,
        },

        products: productsFiltered,

        search: {
            onSearch,
            register,
        }
    }
}