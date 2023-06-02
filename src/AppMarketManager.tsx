import { useEffect } from "react"
import "./index.css"

import { useAppDispatch, useAppSelector } from "./store/store"
import { startLogin } from "./store/auth/thunks";
import { CategoryPage } from "./Category_Page/page/CategoryPage";
import { startGetCategories } from "./store/category/thunks";
import { ModalLayout } from "./layout/ModalLayout";
import { InputText } from "./components/inputs/InputText";
import { useForm } from "react-hook-form";
import { ModalCreateCategory } from "./components/ModalCreateCategory";
import { fetchApi } from "./helpers/fetchApi";
import { ProductPage } from "./Product_Page/page/ProductPage";
import { startGetProducts } from "./store/product/thunks";
import { CashRegisterPage } from "./CashRegister_Page/page/CashRegisterPage";


export const AppMarketManager = () => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector( state => state.category );
    const { products } = useAppSelector( state => state.product );

    useEffect(() => {
        const firstCall = async() => {
            await dispatch( startLogin("adminUser", "admin231023") );
            await dispatch( startGetCategories() );
            await dispatch( startGetProducts() )
        }
        firstCall()
    }, [])

    useEffect(() => {
        const callApi = () => {
            fetchApi({ method: "get", path: "api/product" }).then( data => console.log("Se llamo") )
        }

        const timer = setInterval( callApi, 120000 )
    
        return () => { clearInterval( timer ) }

    }, [])
    

    return (
        <div className="bg-gray-400">
            {/* <Test/> */}
            {/* <ModalCreateCategory/> */}
            {/* <ProductPage /> */}
            <CashRegisterPage />

            {/* <CategoryPage /> */}
        </div>
    )
}