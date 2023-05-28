import { useEffect } from "react"
import "./index.css"

import { useAppDispatch, useAppSelector } from "./store/store"
import { startLogin } from "./store/auth/thunks";
import { CategoryPage } from "./Category_Page/page/CategoryPage";
import { startGetCategories } from "./store/category/thunks";
import { ModalLayout } from "./layout/ModalLayout";
import { InputText } from "./components/inputs/InputText";
import { useForm } from "react-hook-form";
import { Test } from './test';
import { ModalCreateCategory } from "./components/ModalCreateCategory";


export const AppMarketManager = () => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector( state => state.category );

    useEffect(() => {
        const firstCall = async() => {
            await dispatch( startLogin("adminUser", "admin231023") );
            await dispatch( startGetCategories() );
        }
        firstCall()
    }, [])

    return (
        <div className="bg-gray-400">
            {/* <Test/> */}
            <ModalCreateCategory/>

            {/* <CategoryPage categories={data} /> */}
        </div>
    )
}